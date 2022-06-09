import express from 'express';
import { getRankings, getUser } from '../controllers/userController.js';
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js';
import { getUserMiddleware } from '../middlewares/authMiddleware.js';

const userRoute = express.Router();

userRoute.get('/users/:id',autenticationMiddleware, getUserMiddleware, getUser);
userRoute.get('/ranking', getRankings);

export default userRoute;