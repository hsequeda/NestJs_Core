import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class AppLoggerService implements LoggerService {

  protected logger;
  protected context;

  constructor(private readonly configService: ConfigService) {

    const save2File = configService.get<boolean>('logger.file');
    const level = configService.get<string>('logger.level');

    const { combine, timestamp, label, printf, colorize } = winston.format;
    const customFormat = printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] [${level.toUpperCase()}]: ${message}`;
    });

    this.logger = winston.createLogger({
      level: level,

      format: combine(
        colorize({ all: true }),
        label({ label: this.context }),

        timestamp(),
        customFormat,
      ),
      transports: [
        new winston.transports.File({ filename: 'app.log' }),
        new winston.transports.Console(),
      ],
    });

  }


  log(message: any, context?: string): any {
    this.logger.log('info', message);
  }

  debug(message: any, context?: string): any {
    this.logger.log('debug', message);
  }

  warn(message: any, context?: string): any {
    this.logger.log('warn', message);
  }

  error(message: any, trace?: string, context?: string): any {
    this.logger.log('error', message);
  }

  verbose(message: any, context?: string): any {
    this.logger.log('verbose', message);

  }


}
