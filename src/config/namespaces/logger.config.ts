import { registerAs } from '@nestjs/config';
import * as Joi from '@hapi/joi';

export const loggerConfig = registerAs('logger', () => ({
  level: process.env.LOGGER_LEVEL,
}));

export const loggerSchema = {
  level: Joi.string().valid('info', 'error', 'warn', 'debug', 'verbose'),
};
