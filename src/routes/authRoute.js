import express from 'express';
import { register } from '../controllers/authController.js'
import { registerMiddleware } from '../middlewares/authMiddleware.js';

const authRoute = express.Router();

authRoute.post('/signup', registerMiddleware, register);

export default authRoute;