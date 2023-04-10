import path from 'path';

import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import { rateLimit } from 'express-rate-limit';
import xss from 'xss-clean';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRouter from './router/userRoutes.js';
import tourRouter from './router/tourRoutes.js';
import reviewRouter from './router/reviewRoutes.js';
import viewRouter from './router/viewRoutes.js';
import bookingRouter from './router/bookingRoutes.js';

import AppError from './utils/appError.js';
import { globalErrorHandler } from './controller/errorController.js';

dotenv.config({ path: 'config.env' });

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('View', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(
  express.json({
    limit: '10kb',
  })
);
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(helmet());

app.use(xss());

app.use(mongoSanitize());

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(
  'api',
  rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message:
      'Request overload, system is shutting down... Please try again in 1 hour',
  })
);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this route!`, 404));
});

app.use(globalErrorHandler);

export default app;
