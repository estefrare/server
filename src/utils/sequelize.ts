import { Request } from 'express';
import { InferAttributes, Model } from 'sequelize';

import { Client } from '../databases/models/Bank/Client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const trimSequelizeAttribute = <T extends Record<string, any>>(attribute: keyof T) => ({
  get(this: Model<T>) {
    const rawValue = this.getDataValue(attribute) as string;
    if (rawValue && rawValue.trim) {
      return rawValue.trim();
    }
    return rawValue;
  },
  set(this: Model<T>, rawValue: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = null;
    if (rawValue) {
      if (rawValue.trim) {
        value = rawValue.trim();
      } else {
        value = rawValue;
      }
    }
    this.setDataValue(attribute, value);
  },
});

const getPaginationParams = (query: Request['query']) => {
  const offset = Number(query.offset || 0);
  const limit = Number(query.limit || 0);
  return { offset, limit };
};


export default {
  getPaginationParams,
  trimSequelizeAttribute,
};
