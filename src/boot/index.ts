import routes from './routes';
import swagger from './swagger';
import middlewares from './middlewares';
import mongodb from './mongodb';

export default [
  swagger, 
  middlewares, 
  routes,
  mongodb
];
