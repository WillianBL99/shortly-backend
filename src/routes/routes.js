import express from 'express';
import authRoute from './authRoute.js'

const routes = express.Router();

routes.use(authRoute);

export default routes