import express from 'express';
import { defaultRoute } from './defaultRoute';
import { todoRoutes } from './todo';

export const routes = express.Router();

routes.use(express.json());
routes.use(defaultRoute);
routes.use(todoRoutes);
