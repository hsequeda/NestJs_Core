import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError, Logger } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { AppConfigService } from './shared/modules/config/service/app-config-service';
import { AppConfigModule } from './shared/modules/config/app-config.module';

async function bootstrap() {
  const auxApp = await NestFactory.createApplicationContext(AppConfigModule);
  const logLevel = auxApp.get(AppConfigService).app.logLevel;
  const port = auxApp.get(AppConfigService).app.port;
  await auxApp.close();

  const app = await NestFactory.create(AppModule, {
    logger: logLevel,
  });

  const configService: AppConfigService = app.get(AppConfigService);
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
  await app.listen(port);
  Logger.log(
    `🚀 Server running on port :${configService.app.port}`,
    'NestApplication',
  );
}

bootstrap();
