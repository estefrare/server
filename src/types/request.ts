import { Response } from 'express';

interface IResponse {
  message: string;
  data?: object | Array<unknown> | null | string;
  error: boolean;
  code?: number;
}

type Send<T = Response> = (body?: IResponse) => T;

interface CustomResponse extends Response {
  json: Send<this>;
}

export type { IResponse, CustomResponse as Response };
