import * as chalk from 'chalk';
import { IBootOptions } from './boot.options';
import { checkJwt } from '../middlewares/auth';
import { RegisterRoutes } from '../../build/routes';

export default async (options: IBootOptions): Promise<void> => {
  const { app } = options;
  try {    
    // if (process.env.NODE_ENV !== 'development22') {
    //   app.use(checkJwt);
    // }    
    RegisterRoutes(app);
  } catch (err) {
    console.log(chalk.white.bgRed(`Error: ${err.message}`));
  }
};
