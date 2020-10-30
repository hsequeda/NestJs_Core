import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLoggerService } from './common/logger/service/app-logger.service';
import { loggerConfig } from './common/config/app.config';


async function bootstrap() {

  const app = await NestFactory.create(AppModule,{logger: false});
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  const logger = new AppLoggerService(configService)
  app.useLogger(logger);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.debug(`🚀 Server running on port :${port}`, 'NestApplication');

}

bootstrap();
