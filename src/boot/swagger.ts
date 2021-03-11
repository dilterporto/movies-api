import * as chalk from 'chalk';
import * as swaggerUi from 'swagger-ui-express';
import { IBootOptions } from './boot.options';

export default async (options: IBootOptions): Promise<void> => {
  const { app } = options;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const swaggerDocument = require('../../build/swagger/swagger.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (err) {
    console.log(chalk.white.bgRed(`Error generating api docs: ${err.message}`));
  }
};
