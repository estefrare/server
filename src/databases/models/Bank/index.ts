import { DataTypes, Sequelize } from 'sequelize';

import { init as initClient } from './Client';
import { init as initLogin } from './Login';
import { init as initUser } from './User';

const testConnection = async (sequelize: Sequelize) => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connection DataBase ${process.env.DB_NAME_BANK} has been established successfully.`,
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const initModels = (sequelize: Sequelize) => {
  initLogin(sequelize);
  initClient(sequelize);
  initUser(sequelize);
};

export let sequelize: Sequelize;

const setupSequelizeConnection = async (): Promise<Sequelize> => {
  sequelize = new Sequelize(
    process.env.DB_NAME_BANK || '',
    process.env.DB_USER || '',
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_SERVER,
      dialect: 'mssql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions: {
        options: {
          validateBulkLoadParameters: true,
        },
      },
      define: {
        freezeTableName: true,
      },
      logging: process.env.LOGGING_DB === 'true',
    },
  );

  // https://stackoverflow.com/a/49678951
  DataTypes.DATE.prototype._stringify = function _stringify(date: Date, options: unknown) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await testConnection(sequelize);

  initModels(sequelize);

  return sequelize;
};

export default setupSequelizeConnection;
