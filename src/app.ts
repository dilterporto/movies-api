import * as express from 'express';
import boots from './boot';

const app = express();

boots.forEach(async (boot) => {
  await boot({ app });
});

export { app };
