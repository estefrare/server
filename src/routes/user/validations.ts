import { body, checkExact, param } from 'express-validator';

import { ErrorMessages } from '../../types/validations';
import { validateResult } from '../../utils/validations';

const getById = () => {
  return [
    param('id')
      .exists()
      .withMessage(ErrorMessages.required('id'))
      .isNumeric()
      .withMessage(ErrorMessages.format('id')),
    checkExact(),
    validateResult,
  ];
};

const createUser = () => {
  return [
    body('clientId')
      .exists()
      .withMessage(ErrorMessages.required('clientId'))
      .isNumeric()
      .withMessage(ErrorMessages.format('clientId')),
    body('name')
      .exists()
      .withMessage(ErrorMessages.required('name'))
      .isString()
      .withMessage(ErrorMessages.format('name')),
    body('email')
      .exists()
      .withMessage(ErrorMessages.required('email'))
      .isEmail()
      .withMessage(ErrorMessages.format('email')),
    body('username')
      .exists()
      .withMessage(ErrorMessages.required('username'))
      .isString()
      .withMessage(ErrorMessages.format('username')),
    body('password')
      .exists()
      .withMessage(ErrorMessages.required('password'))
      .isString()
      .withMessage(ErrorMessages.format('password')),
    body('status')
      .exists()
      .withMessage(ErrorMessages.required('status'))
      .isBoolean()
      .withMessage(ErrorMessages.format('status')),
    checkExact(),
    validateResult,
  ];
};

const editUser = () => {
  return [
    param('id')
      .exists()
      .withMessage(ErrorMessages.required('id'))
      .isNumeric()
      .withMessage(ErrorMessages.format('id')),
    body('clientId')
      .exists()
      .withMessage(ErrorMessages.required('clientId'))
      .isNumeric()
      .withMessage(ErrorMessages.format('clientId')),
    body('name')
      .exists()
      .withMessage(ErrorMessages.required('name'))
      .isString()
      .withMessage(ErrorMessages.format('name')),
    body('email')
      .exists()
      .withMessage(ErrorMessages.required('email'))
      .isEmail()
      .withMessage(ErrorMessages.format('email')),
    body('username')
      .exists()
      .withMessage(ErrorMessages.required('username'))
      .isString()
      .withMessage(ErrorMessages.format('username')),
    body('password')
      .exists()
      .withMessage(ErrorMessages.required('password'))
      .isString()
      .withMessage(ErrorMessages.format('password')),
    body('status')
      .exists()
      .withMessage(ErrorMessages.required('status'))
      .isBoolean()
      .withMessage(ErrorMessages.format('status')),
    checkExact(),
    validateResult,
  ];
};

export default {
  createUser,
  editUser,
  getById,
};
