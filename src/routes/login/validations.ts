import { body, checkExact } from 'express-validator';

import { ErrorMessages } from '../../types/validations';
import { validateResult } from '../../utils/validations';

const login = () => {
  return [
    body('email')
      .exists()
      .withMessage(ErrorMessages.required('email'))
      .isString()
      .withMessage(ErrorMessages.format('email')),
    body('password')
      .exists()
      .withMessage(ErrorMessages.required('password'))
      .isString()
      .withMessage(ErrorMessages.format('password')),
    checkExact(),
    validateResult,
  ];
};

export default {
  login,
};
