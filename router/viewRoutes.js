import express from 'express';
import * as viewController from '../controller/viewController.js';
import * as authController from '../controller/authController.js';
import * as bookingController from '../controller/bookingsController.js';

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);
router.get(`/tour/:slug`, authController.isLoggedIn, viewController.getTour);
router.get(`/login`, authController.isLoggedIn, viewController.getLogin);
router.get(`/me`, authController.protect, viewController.getAccount);

router.get(
  '/my-tours',
  bookingController.createBookingCheckout,
  authController.protect,
  viewController.getMyTours
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

export default router;
