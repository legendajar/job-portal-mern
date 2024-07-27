import express from 'express'
import { login, logout, register, updateProfile } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const userRouter = express.Router();

// Register Route
userRouter.post('/register', register);

// Login Route
userRouter.post('/login', login);

// Logout Route
userRouter.post('/logout', logout);

// Update Profile Route
userRouter.post('/updateProfile', isAuthenticated, updateProfile);

export default userRouter;