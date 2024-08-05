import cors from 'cors';
import express, { Express, Response } from 'express';
import boom from 'express-boom';

import authorizeJWT from './middleware/authorizeJWT';
import handleAuthErrors from './middleware/handle-auth-errors';
import initProcess from './process';
import router from './routes';

export const startServer = () => {
  const app: Express = express();

  app.use(cors());
  app.use(express.json());

  app.use(boom());

  app.get('/', (_req, res: Response) => {
    res.status(200).send({
      message: `Server is up ✅ - Environment: ${process.env.ENV}`,
      error: false,
    });
  });

  app.use('/api', authorizeJWT, handleAuthErrors, router);

  initProcess();

  return app;
};
