import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLoggerService } from './common/logger/service/app-logger.service';
import { loggerConfig } from './common/config/app.config';
import { AppConfigService } from './common/config/service/app-config-service';


async function bootstrap() {

  const app = await NestFactory.create(AppModule, { logger: false });
  const configService = app.get(AppConfigService);
  const appConfig = configService.getAppConfig();
  const loggerConfig = configService.getLoggerConfig();
  let logger = null;

  if (loggerConfig.enabled) {
    logger = new AppLoggerService(configService);
    app.useLogger(logger);
  }
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(appConfig.port);
  logger ? logger.debug(`🚀 Server running on port :${appConfig.port}`, 'NestApplication') : null;
}

bootstrap();
