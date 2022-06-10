import express from 'express';
import { login, register } from '../controllers/authController.js'
import { loginMiddleware, registerMiddleware} from '../middlewares/authMiddleware.js';
import validateSchemas from '../middlewares/validateSchemasMiddleware.js';
import authSCH from '../schemas/authSchemas.js';

const authRoute = express.Router();

authRoute.post(
	'/signup',
	(req, res, next) => validateSchemas(req, res, next, authSCH.register),
	registerMiddleware,
	register
);

authRoute.post(
	'/signin',
	(req, res, next) => validateSchemas(req, res, next, authSCH.login),
	loginMiddleware,
	login
);

export default authRoute;