import { differenceInDays } from 'date-fns';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IDecodedToken } from '../types/jwt';

const authJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as IDecodedToken | string;

    if (typeof decoded === 'string') {
      throw new Error('Token invalid');
    }

    const dayDifference = differenceInDays(new Date(), new Date(decoded.timestamp));

    if (dayDifference > 0) {
      throw new Error('Token expired');
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.boom.unauthorized(error.message);
    }
    return res.boom.unauthorized(String(error));
  }
  next();
};

export default authJWT;
