import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();

import { startServer } from './app';
import { connectDatabases } from './databases';

(async () => {
  try {
    await connectDatabases();
    const app = startServer();
    app.listen(process.env.PORT, () => {
      console.log(`⚡️ Server is running at http://localhost:${process.env.PORT} ✅`);
    });
  } catch (error) {
    console.error(error);
  }
})();
