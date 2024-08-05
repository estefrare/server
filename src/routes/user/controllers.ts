import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../../databases/models/Bank/User';
import { Response } from '../../types/request';
import hashPassword from '../../utils/hashPassword';

const getAll = async (req: Request, res: Response) => {
  try {
    const response: User[] = await User.findAll();
    const responseFormatted = response.map((user) => ({
      id: user.id,
      user: user.username,
      password: user.password,
      email: user.email,
      timestamp: user.timestamp,
      status: Number(user.status),
      name: user.name,
    }));

    if (responseFormatted.length) {
      return res.status(StatusCodes.OK).json({
        message: 'User list',
        data: responseFormatted,
        error: false,
      });
    }
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Cannot get the list of Users',
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

const createUser = async (req: Request, res: Response) => {
  try {
    const user = { ...req.body, password: hashPassword(req.body.password) };
    const response = await User.create(user);

    if (response) {
      return res.status(StatusCodes.OK).json({
        message: 'The user has been created',
        data: response,
        error: false,
      });
    }
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Cannot create user',
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

const getById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      return res.status(StatusCodes.OK).json({
        message: 'User found',
        data: user,
        error: false,
      });
    }
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Cannot get the User',
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

const editUser = async (req: Request, res: Response) => {
  try {
    const user = { ...req.body, password: hashPassword(req.body.password) };
    const response = await User.update(user, {
      where: { id: req.params.id },
    });

    if (response) {
      return res.status(StatusCodes.OK).json({
        message: 'The user has been edited',
        data: { status: 'ok', id: req.params.id },
        error: false,
      });
    }
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Cannot edit user',
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
  getAll,
  getById,
  createUser,
  editUser,
};
