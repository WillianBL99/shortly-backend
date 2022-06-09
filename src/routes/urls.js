import express from 'express';
import { getUrl, urlShorten } from '../controllers/urlsController.js';
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js';
import { urlsMiddleware } from '../middlewares/urlsMiddleware.js';

const urlsRoute = express.Router();

urlsRoute.post('/urls/shorten', autenticationMiddleware, urlsMiddleware, urlShorten);
urlsRoute.get('/urls/:id', getUrl);

export default urlsRoute;