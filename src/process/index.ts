import { expiredPasswordReminder } from './expiredPasswordReminder';

const startProcess = () => {
  // Avoid running cron-jobs when server is running locally
  if (process.env.IS_LOCAL !== 'true') {
    expiredPasswordReminder();
  }
};

export default startProcess;
