import * as reviewController from '../controller/reviewController.js';
import * as authController from '../controller/authController.js';
import express from 'express';

const router = express.Router({ mergeParams: true });

// NECESSARY TO BE LOGGED IN TO MOVE ON TO FOLLOWING EVENTS
router.use(authController.protect);

//CRUD REVIEWS
router
  .route('/')
  .get(
    // authController.restrictTo('admin', 'lead-guide', 'guide'),
    reviewController.getAllReviews
  )
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('admin', 'user'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview
  );

export default router;
