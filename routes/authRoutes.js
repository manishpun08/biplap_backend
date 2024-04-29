import express from 'express';
import { signin, getProfile, signup } from '../controllers/authController.js';
import { auth, isAdmin } from '../middlewares/auth.js';

export const authRouter = express.Router();

authRouter.post('/login', signin);
authRouter.get('/profile', auth, getProfile);
authRouter.post('/signup', signup);
