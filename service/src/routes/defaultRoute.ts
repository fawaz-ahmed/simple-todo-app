import { Router } from 'express';

export const defaultRoute = Router();

defaultRoute.get('/', function(req, res) {
  console.log('Session id', req.session);
  res.status(200).send('Hello ' + req.session.id);
});