import winston from 'winston';
import Sentry from 'winston-transport-sentry-node';
import dotenv from 'dotenv';

dotenv.config();

const log_level = (process.env.LOG_LEVEL) ? process.env.LOG_LEVEL : 'debug';

const logger = winston.createLogger({
  level: log_level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({ handleExceptions: true }),
    new Sentry({
      sentry: {
        dsn: process.env.SENTRY_DSN,
      },
      handleExceptions: true,
    }),
  ],
});

export { logger };
