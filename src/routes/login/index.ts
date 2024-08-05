import express from 'express';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router.post('/', validations.login(), controllers.login);

export default router;
