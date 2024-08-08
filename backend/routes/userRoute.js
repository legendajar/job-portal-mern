import express from 'express'
import { login, logout, register, updateProfile, forgetPassword } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import singleUpload from '../middlewares/multer.js';
import profileUploader from '../middlewares/profileImageUploader.js';

const userRouter = express.Router();

// Register Route
userRouter.post('/register', profileUploader, register);

// Login Route
userRouter.post('/login', login);

// Logout Route
userRouter.post('/logout', logout);

// Update Profile Route
userRouter.post('/updateProfile', isAuthenticated, singleUpload,  updateProfile);

// Forget Password Route
userRouter.post('/forgotpassword', forgetPassword);

export default userRouter;