import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { AppConfigService } from './config/service/app-config-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: AppConfigService = app.get(AppConfigService);
  /* app.useLogger(new AppLoggerService(configService)); */
  /* const loggerConfig: ILoggerConfig = configService.getLoggerConfig(); */
  /* let logger = null; */
  /* if (loggerConfig.enabled) { */
  /*   logger = new AppLoggerService(configService); */
  /*   app.useLogger(logger); */
  /* } */
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
  await app.listen(configService.app.port);
  /* throw new Error('implements me!'); */
  /* logger */
  /*   ? logger.debug( */
  /*       `🚀 Server running on port :${appConfig.port}`, */
  /*       'NestApplication', */
  /*     ) */
  /*   : null; */
}

bootstrap();
