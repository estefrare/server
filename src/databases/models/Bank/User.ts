import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare clientId: ForeignKey<Client['id']>;
  declare username: string | null;
  declare password: string | null;
  declare timestamp: Date | null;
  declare name: string | null;
  declare status: boolean | null;
  declare email: string | null;
}

import utils from '../../../utils/sequelize';
import { Client } from './Client';

export const init = async (sequelize: Sequelize) => {
  await User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'ID',
      },
      username: {
        type: DataTypes.CHAR(150),
        allowNull: true,
        field: 'Usuario',
        ...utils.trimSequelizeAttribute('username'),
      },
      password: {
        type: DataTypes.CHAR(255),
        allowNull: true,
        field: 'Password',
        ...utils.trimSequelizeAttribute('password'),
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('getdate()'),
        field: 'TimeStamp',
      },
      name: {
        type: DataTypes.CHAR(100),
        allowNull: true,
        field: 'Name',
        ...utils.trimSequelizeAttribute('name'),
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        field: 'Status',
      },
      email: {
        type: DataTypes.CHAR(150),
        allowNull: true,
        defaultValue: '',
        field: 'email',
        ...utils.trimSequelizeAttribute('email'),
      },
    },
    {
      sequelize,
      tableName: 'Usuarios',
      timestamps: false,
    },
  );
  User.belongsTo(Client, { foreignKey: { name: 'clientId', field: 'IdClient' } });
};
