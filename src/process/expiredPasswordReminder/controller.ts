import { addDays, endOfDay, startOfDay } from 'date-fns';
import { Op } from 'sequelize';

import { MAX_FAILED_ATTEMPTS } from '../../constants/general';
import { Login } from '../../databases/models/Bank/Login';

const checkPasswords = async () => {
  const currentDate = new Date();
  const thirtyDaysAgo = addDays(currentDate, 30);
  const startOfThirtyDaysAgo = startOfDay(thirtyDaysAgo);
  const endOfThirtyDaysAgo = endOfDay(thirtyDaysAgo);
  const logins = await Login.findAll({
    attributes: ['clientId', 'expiringDate'],
    where: {
      failedAttempts: { [Op.lt]: MAX_FAILED_ATTEMPTS },
      expiringDate: { [Op.between]: [startOfThirtyDaysAgo, endOfThirtyDaysAgo] },
    },
  });
  console.log("logins", logins)
};

export default { checkPasswords };
