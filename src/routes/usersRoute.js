import express from 'express';
import { getRankings, getUser } from '../controllers/userController.js';
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js';

const userRoute = express.Router();

userRoute.use(autenticationMiddleware);

userRoute.get('/users/:id', getUser);
userRoute.get('/users/ranking', getRankings);

export default userRoute;