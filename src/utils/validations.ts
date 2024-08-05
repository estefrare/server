import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import { IResponse } from '../types/request';

export const validateResult = (req: Request, res: Response, next: () => void) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0].msg;
    const errorResponse: IResponse = {
      message: errorMessage,
      error: true,
    };
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};
