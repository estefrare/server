import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError as Jwt401Error } from 'express-jwt';

const handleAuthErrors = (err: Jwt401Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Jwt401Error) {
    return res.boom.unauthorized(err.message);
  }
  next();
};

export default handleAuthErrors;
