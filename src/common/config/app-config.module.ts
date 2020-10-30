import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { appConfig, databaseConfig, emailConfig, loggerConfig } from './app.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, emailConfig, loggerConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),
        DATABASE_PORT: Joi.number().default(1521),
        LOGGER_LEVEL: Joi.string().valid('info', 'error', 'warn', 'debug', 'verbose').default('debug'),
        LOGGER_ENABLE: Joi.boolean().default(true),
        LOGGER_FILE: Joi.boolean().default(false),
        SMTP_PORT: Joi.number().valid(25, 465),
        SMTP_EMAIL: Joi.string(),
      }),
      validationOptions: { abortEarly: true },
    }),
  ],
  providers: [],
})
export class AppConfigModule {
}