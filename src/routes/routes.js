import express from 'express';
import authRoute from './authRoute.js'
import urlsRoute from './urlsRoute.js';
import userRoute from './usersRoute.js';

const routes = express.Router();

routes.use(authRoute);
routes.use(urlsRoute);
routes.use(userRoute);

export default routes