import express from 'express';
import { deleteUrl, getUrl, openUrl, urlShorten } from '../controllers/urlsController.js';
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js';
import validateSchemas from '../middlewares/validateSchemasMiddleware.js';
import {deleteUrlMeddleWare } from '../middlewares/urlsMiddleware.js';
import authSCH from '../schemas/authSchemas.js';
import paramsSCH from '../schemas/paramsSchemas.js';

const urlsRoute = express.Router();

urlsRoute.get(
	'/urls/:id',
	(req, res, next) => validateSchemas(req, res, next, paramsSCH.paramsId),
	getUrl
);
urlsRoute.get(
	'/urls/open/:shortUrl',
	(req, res, next) => validateSchemas(req, res, next, paramsSCH.paramsShortUrl),
	openUrl
);

urlsRoute.post(
	'/urls/shorten',
	autenticationMiddleware,
	(req, res, next) => validateSchemas(req, res, next, authSCH.validateUrl),
	urlShorten
);

urlsRoute.delete(
	'/urls/:id',
	autenticationMiddleware,
	(req, res, next) => validateSchemas(req, res, next, paramsSCH.paramsId),
	deleteUrlMeddleWare,
	deleteUrl
);

export default urlsRoute;