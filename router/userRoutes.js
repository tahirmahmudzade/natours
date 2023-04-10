/* eslint-disable import/extensions */
import express from 'express';
import * as userController from '../controller/userController.js';
import * as authController from '../controller/authController.js';

const router = express.Router();

// LOGIN & SIGNUP
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// FORGOT PASSWORD
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// NECESSARY TO BE LOGGED IN TO MOVE ON TO FOLLOWING EVENTS
router.use(authController.protect);

// ABOUT ME
router.route('/me').get(userController.getMe, userController.getUser);
router.patch('/updateMe', userController.uploadImg, userController.updateMe);
router.delete(
  '/deleteMe',
  authController.restrictTo('user'),
  userController.deleteMe
);

// CHANGE MY PASSWORD
router.patch(
  '/updateMyPassword',
  authController.restrictTo('user'),
  authController.updatePassword
);

// CRUD USERS
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
