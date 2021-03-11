import * as chalk from 'chalk';
import { app } from './app';

app.listen(3013, () => {
  console.log(
    chalk.greenBright(
      `✓ Started API server at port 3013 (${process.env.NODE_ENV})`
    )
  );
});

