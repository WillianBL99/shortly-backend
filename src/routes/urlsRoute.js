import express from 'express';
import { deleteUrl, getUrl, openUrl, urlShorten } from '../controllers/urlsController.js';
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js';
import bodyValidation from '../middlewares/boryValidateMiddleware.js';
import {deleteUrlMeddleWare } from '../middlewares/urlsMiddleware.js';
import authSCH from '../schemas/authSchemas.js';

const urlsRoute = express.Router();

urlsRoute.get('/urls/:id', getUrl);
urlsRoute.get('/urls/open/:shortUrl', openUrl);

urlsRoute.post(
	'/urls/shorten',
	(req, res, next) => bodyValidation(req, res, next, authSCH.validateUrl),
	autenticationMiddleware,
	urlShorten
);

urlsRoute.delete(
	'/urls/:id',
	autenticationMiddleware,
	deleteUrlMeddleWare,
	deleteUrl
);

export default urlsRoute;