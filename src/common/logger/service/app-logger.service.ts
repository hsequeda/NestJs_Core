import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { Transports } from 'winston/lib/winston/transports';
import { AppConfigService } from '../../config/service/app-config-service';

@Injectable()
export class AppLoggerService implements LoggerService {

  protected logger;
  protected context: string;

  constructor(private readonly _configService: AppConfigService) {
    this.logger = winston.createLogger(this.loggerOptions());
  }

  private loggerOptions(): winston.LoggerOptions {
    const loggerConfig = this._configService.getLoggerConfig();

    const transports: any[] = [];
    transports.push(new winston.transports.Console());

    if(loggerConfig.inFile){
      transports.push(new winston.transports.File({ filename: 'app.log' }));
    }

    const { combine, timestamp, label, printf, colorize } = winston.format;
    const customFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    });

    return {
      level: loggerConfig.level,
      format: combine(
        colorize({ all: true }),
        timestamp(),
        customFormat,
      ),
      transports: transports
    };
  }


  log(message: any, context?: string): any {
    this.logger.log('info', this.processMessage(message, context));
  }

  debug(message: any, context?: string): any {
    this.logger.log('debug', this.processMessage(message, context));
  }

  warn(message: any, context?: string): any {
    this.logger.log('warn', this.processMessage(message, context));
  }

  error(message: any, trace?: string, context?: string): any {
    this.logger.log('error', this.processMessage(message, context));
  }

  verbose(message: any, context?: string): any {
    this.logger.log('verbose', this.processMessage(message, context));
  }

  private processMessage(message: string, context: string): string {
    if (context) {
      return `[${context}] ${message}`;
    } else if (this.context) {
      return `[${this.context}] ${message}`;
    } else {
      return message;
    }
  }

  setContext(context: string) {
    this.context = context;
  }
}
