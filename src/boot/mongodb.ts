import * as mongoose from 'mongoose';
import * as chalk from 'chalk';
import constants from '../config/constants';
import { IBootOptions } from './boot.options';

export default async (options: IBootOptions): Promise<void> => {
  const { app } = options;
  mongoose.set('debug', true);
    try {
      await mongoose.connect(constants.mongodbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log(chalk.greenBright(`✓ MongoDB Database connected at ${constants.mongodbConnectionString}`));
    } catch (err) {
      console.log(chalk.white.bgRed(`Error: ${err.message}`));
    }
};
