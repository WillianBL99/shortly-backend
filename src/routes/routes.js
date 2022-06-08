import express from 'express';
import authRoute from './authRoute.js'
import urlsRoute from './urls.js';

const routes = express.Router();

routes.use(authRoute);
routes.use(urlsRoute);

export default routes