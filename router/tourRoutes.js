import express from 'express';
import * as tourController from '../controller/tourController.js';
import reviewRouter from './reviewRoutes.js';
import * as authController from '../controller/authController.js';

const router = express.Router();

// TOP 5 CHEAPEST TOURS
router
  .route('/top-5-cheap')
  .get(tourController.topFiveCheap, tourController.getAllTours);

// NECESSARY TO BE LOGGED IN TO MOVE ON TO FOLLOWING EVENTS
router.use(authController.protect);

// OVERALL TOUR STATS
router
  .route('/tour-stats')
  .get(
    authController.restrictTo('admin', 'lead-guide'),
    tourController.tourStats
  );
router
  .route('/monthly-plan/:year')
  .get(
    authController.restrictTo('admin', 'lead-guide'),
    tourController.getMonthlyPlan
  );

// GET TOURS WITHIN RADIUS
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

// GET ALL TOUR DISTANCES FROM GIVEN POSITION
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

// NESTED ROUTE => REVIEWS ON TOUR
router.use('/:tourId/reviews', reviewRouter);

// CRUD TOURS
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTours
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(authController.restrictTo('admin'), tourController.deleteTour);

export default router;
