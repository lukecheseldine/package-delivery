import express, { Express } from 'express';
import path from 'path';

export const addExpressMiddleware = (app: Express) => {
  app.use(express.json());
  app.use('/assets', express.static(path.join(__dirname, 'assets')));
};
