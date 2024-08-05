import cron from 'node-cron';

import controller from './controller';

export const expiredPasswordReminder = async () => {
  cron.schedule(
    '0 0 20 * * *', // SECONDS MINUTES HOURS DAYS
    async () => {
      try {
        await controller.checkPasswords();
      } catch (error) {
        console.error(error);
      }
    },
    {
      scheduled: true,
      timezone: 'America/Argentina/Buenos_Aires',
    },
  );
};
