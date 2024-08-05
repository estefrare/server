import { CreationOptional, DataTypes, ForeignKey, Model, Sequelize } from 'sequelize';

import utils from '../../../utils/sequelize';
import { Client } from './Client';

export class Login extends Model {
  declare id: CreationOptional<number>;
  declare clientId: ForeignKey<Client['id']>;
  declare user: string | null;
  declare password: string | null;
  declare timestamp: Date | null;
  declare expiringDate: Date | null;
  declare clientIp: string | null;
  declare failedAttempts: number | null;
}

export const init = async (sequelize: Sequelize) => {
  await Login.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'IDCliente',
      },
      user: {
        type: DataTypes.CHAR(100),
        allowNull: true,
        field: 'Usuario',
        ...utils.trimSequelizeAttribute('Usuario'),
      },
      password: {
        type: DataTypes.CHAR(100),
        allowNull: true,
        field: 'Password',
        ...utils.trimSequelizeAttribute('Password'),
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('getdate()'),
        field: 'TimeStamp',
      },
      expiringDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'Vencimiento',
      },
      clientIp: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        defaultValue: '',
        field: 'ipcliente',
        ...utils.trimSequelizeAttribute('ipcliente'),
      },
      failedAttempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: 'intentosfallidos',
      },
    },
    {
      sequelize,
      tableName: 'Logins',
      timestamps: false,
    },
  );

  Login.belongsTo(Client, { foreignKey: { name: 'clientId', field: 'IDCliente' } });
};
