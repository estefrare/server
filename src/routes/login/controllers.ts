import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../../databases/models/Bank/User';
import { Response } from '../../types/request';
import hashPassword from '../../utils/hashPassword';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const response = await User.findOne({
      where: {
        email: email,
        password: hashPassword(password),
      },
    });
    if (response)
      return res.status(StatusCodes.OK).json({
        message: `Welcome ${response.email}`,
        data: response,
        error: false,
      });

    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Credentials are not valid',
      data: undefined,
      error: true,
    });
  } catch (error: unknown) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : JSON.stringify(error),
      data: undefined,
      error: true,
    });
  }
};
export default {
  login,
};
