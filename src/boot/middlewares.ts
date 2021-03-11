import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { Logger } from '../config/logger';
import { IBootOptions } from './boot.options';

export default async (options: IBootOptions): Promise<void> => {
  const { app } = options;
  app.use(cors());
  app.use(bodyParser.json());
  app.disable('x-powered-by');

  const unhandledErrorHandler = (...args: any[]): void => {
    Logger.error('Unhandled Error...', ...args);
    process.exit(1);
  };
  process.on('uncaughtException', unhandledErrorHandler);
  process.on('unhandledRejection', unhandledErrorHandler);
}
