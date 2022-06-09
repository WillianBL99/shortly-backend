import express from 'express';
import { deleteUrl, getUrl, openUrl, urlShorten } from '../controllers/urlsController.js';
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js';
import { urlsMiddleware } from '../middlewares/urlsMiddleware.js';

const urlsRoute = express.Router();

urlsRoute.post('/urls/shorten', autenticationMiddleware, urlsMiddleware, urlShorten);
urlsRoute.get('/urls/:id', getUrl);
urlsRoute.get('/urls/open/:shortUrl', openUrl);
urlsRoute.delete('/urls/:id', autenticationMiddleware, deleteUrl);

export default urlsRoute;