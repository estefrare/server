import express from 'express';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router.get('/', controllers.getAll);
router.post('/', validations.createUser(), controllers.createUser);
router.get('/:id', validations.getById(), controllers.getById);
router.post('/:id', validations.editUser(), controllers.editUser);

export default router;
