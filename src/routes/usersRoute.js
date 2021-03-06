import express from 'express';
import { getRankings, getUser } from '../controllers/userController.js';
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js';
import { getUserMiddleware } from '../middlewares/authMiddleware.js';
import validateSchemas from '../middlewares/validateSchemasMiddleware.js';
import paramsSCH from '../schemas/paramsSchemas.js';

const userRoute = express.Router();

userRoute.get(
	'/users/:id',
	autenticationMiddleware,
	(req, res, next) => validateSchemas(req, res, next, paramsSCH.paramsId),
	getUserMiddleware,
	getUser
);

userRoute.get('/ranking', getRankings);

export default userRoute;