import express from 'express';
import { deleteUrl, getUrl, openUrl, urlShorten } from '../controllers/urlsController.js';
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js';
import { createShortUrlMiddleware, deleteUrlMeddleWare } from '../middlewares/urlsMiddleware.js';

const urlsRoute = express.Router();

urlsRoute.post('/urls/shorten', autenticationMiddleware, createShortUrlMiddleware, urlShorten);
urlsRoute.get('/urls/:id', getUrl);
urlsRoute.get('/urls/open/:shortUrl', openUrl);
urlsRoute.delete('/urls/:id', autenticationMiddleware,deleteUrlMeddleWare, deleteUrl);

export default urlsRoute;