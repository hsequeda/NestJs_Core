import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: process.env.PORT,
}));

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
}));

export const emailConfig = registerAs('smtp', () => ({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  email: process.env.SMTP_EMAIL,
  password: process.env.SMTP_PASSWORD,
}));

export const loggerConfig = registerAs('logger', () => ({
  level: process.env.LOGGER_LEVEL,
  enabled: process.env.LOGGER_ENABLED,
  inFile: process.env.LOGGER_IN_FILE
}));