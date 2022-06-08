import express from 'express';
import { urlShorten } from '../controllers/urlsController.js';
import autenticationMiddleware from '../middlewares/autenticationMiddleware.js';

const urlsRoute = express.Router();

urlsRoute.post('/urls/shorten', autenticationMiddleware, urlShorten);

export default urlsRoute;