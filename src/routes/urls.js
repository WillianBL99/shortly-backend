import express from 'express';
import { urlShorten } from '../controllers/urlsController.js';
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js';
import { urlsMiddleware } from '../middlewares/urlsMiddleware.js';

const urlsRoute = express.Router();

urlsRoute.post('/urls/shorten', autenticationMiddleware, urlsMiddleware, urlShorten);

export default urlsRoute;