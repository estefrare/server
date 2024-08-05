import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';

import utils from '../../../utils/sequelize';
import { Login } from './Login';

export class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
  declare id: CreationOptional<number>;
  declare name: string | undefined;
  declare lastName: string | undefined;
  declare legalName: string | undefined;
  declare passport: string;
  declare countryId: number | undefined;
  declare address: string | undefined;
  declare number: string | undefined;
  declare postalCode: string | undefined;
  declare email: string | undefined;
  declare mobile: string | undefined;
  declare facebookId: string | undefined;
  declare googleId: string | undefined;
  declare appleId: string | undefined;
  declare otherId: string | undefined;
  declare status: number | undefined;
  declare verified: number | undefined;
  declare timestamp: Date | undefined;
  declare level: number | undefined;
  declare categoryId: number | undefined;
  declare usage: string | undefined;
  declare maritalStatusId: number | undefined;
  declare genderId: number | undefined;
  declare floor: string | undefined;
  declare department: string | undefined;
  declare origin: string | undefined;
  declare originId: string | undefined;
  declare transferLimit: number | null;
  declare Login?: NonAttribute<Login>;
  declare locationId: number | undefined;
}

export const init = async (sequelize: Sequelize) => {
  await Client.init(
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'ID',
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.CHAR(100),
        allowNull: true,
        field: 'Nombre',
        ...utils.trimSequelizeAttribute('name'),
      },
      lastName: {
        type: DataTypes.CHAR(100),
        allowNull: true,
        field: 'Apellido',
        ...utils.trimSequelizeAttribute('lastName'),
      },
      legalName: {
        type: DataTypes.CHAR(100),
        allowNull: true,
        defaultValue: '',
        field: 'RazonSocial',
        ...utils.trimSequelizeAttribute('legalName'),
      },
      passport: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        field: 'Passport',
        ...utils.trimSequelizeAttribute('passport'),
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'Idpais',
      },
      address: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        field: 'Calle',
        ...utils.trimSequelizeAttribute('address'),
      },
      number: {
        type: DataTypes.CHAR(10),
        allowNull: true,
        field: 'Numero',
        ...utils.trimSequelizeAttribute('number'),
      },
      postalCode: {
        type: DataTypes.CHAR(10),
        allowNull: true,
        field: 'CP',
        ...utils.trimSequelizeAttribute('postalCode'),
      },
      email: {
        type: DataTypes.CHAR(150),
        allowNull: true,
        field: 'Email',
        ...utils.trimSequelizeAttribute('email'),
      },
      mobile: {
        type: DataTypes.CHAR(20),
        allowNull: true,
        field: 'Movil',
        ...utils.trimSequelizeAttribute('mobile'),
      },
      facebookId: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        field: 'FacebookID',
        ...utils.trimSequelizeAttribute('facebookId'),
      },
      googleId: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        field: 'GoogleID',
        ...utils.trimSequelizeAttribute('googleId'),
      },
      appleId: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        field: 'AppleID',
        ...utils.trimSequelizeAttribute('appleId'),
      },
      otherId: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        field: 'OtherID',
        ...utils.trimSequelizeAttribute('otherId'),
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'Status',
      },
      verified: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: 'Verificado',
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        field: 'TimeStamp',
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'Nivel',
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        field: 'IDCategoria',
      },
      usage: {
        type: DataTypes.CHAR(10),
        allowNull: true,
        defaultValue: 'P',
        field: 'Uso',
        ...utils.trimSequelizeAttribute('usage'),
      },
      maritalStatusId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'IdEstadoCivil',
      },
      genderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'IdGenero',
      },
      floor: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        defaultValue: '',
        field: 'Piso',
        ...utils.trimSequelizeAttribute('floor'),
      },
      department: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        defaultValue: '',
        field: 'Departamento',
        ...utils.trimSequelizeAttribute('department'),
      },
      origin: {
        type: DataTypes.CHAR(20),
        allowNull: true,
        defaultValue: '',
        field: 'Origen',
        ...utils.trimSequelizeAttribute('origin'),
      },
      originId: {
        type: DataTypes.CHAR(255),
        allowNull: true,
        defaultValue: '',
        field: 'IDOrigen',
        ...utils.trimSequelizeAttribute('originId'),
      },
      transferLimit: {
        type: DataTypes.INTEGER,
        field: 'transferLimit',
        allowNull: true,
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'locationId',
      },
    },
    {
      sequelize,
      tableName: 'Clientes',
      timestamps: false,
    },
  );

  Client.hasOne(Login, { foreignKey: { name: 'clientId', field: 'IDCliente' } });
};
