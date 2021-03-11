const { env } = process;

export default {
  environment: env.NODE_ENV,
  port: Number(env.PORT),
  mongodbConnectionString: env.MONGODB_CONNECTIONSTRING
};
