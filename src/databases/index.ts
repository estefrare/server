import setupSequelizeConnectionBank from './models/Bank';

export const connectDatabases = async () => {
  return Promise.all([
    setupSequelizeConnectionBank(),
  ]);
};
