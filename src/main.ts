import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { AppLoggerService } from './logger/service/app-logger.service';
import { AppConfigService } from './config/service/app-config-service';
import { UserInputError } from 'apollo-server-express';
import { ILoggerConfig } from './config/interfaces/ILoggerConfig';
import { IAppConfig } from './config/interfaces/IAppConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const configService = app.get(AppConfigService);

  const appConfig: IAppConfig = configService.getAppConfig();
  const loggerConfig: ILoggerConfig = configService.getLoggerConfig();
  let logger = null;
  if (loggerConfig.enabled) {
    logger = new AppLoggerService(configService);
    app.useLogger(logger);
  }
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new UserInputError(
          `error ${JSON.stringify(
            errors[0].constraints,
          )} in property ${JSON.stringify(errors[0].property)}`,
        );
      },
    }),
  );
  await app.listen(appConfig.port);
  logger
    ? logger.debug(
    `🚀 Server running on port :${appConfig.port}`,
    'NestApplication',
    )
    : null;
}

bootstrap();
