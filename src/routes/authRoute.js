import express from 'express';
import { login, register } from '../controllers/authController.js'
import { loginMiddleware, registerMiddleware } from '../middlewares/authMiddleware.js';

const authRoute = express.Router();

authRoute.post('/signup', registerMiddleware, register);
authRoute.post('/signin', loginMiddleware, login);

export default authRoute;