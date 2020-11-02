import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDataBaseConfig } from '../interfaces/IDataBaseConfig';
import { IAppConfig } from '../interfaces/IAppConfig';
import { ISMTPConfig } from '../interfaces/ISMTPConfig';
import { ILoggerConfig, LoggerLevel } from '../interfaces/ILoggerConfig';

@Injectable()
export class AppConfigService {
  constructor(private readonly _configService: ConfigService) {}

  getAppConfig(): IAppConfig {
    return {
      port: this._configService.get<number>('app.port'),
    };
  }

  getDataBaseConfig(): IDataBaseConfig {
    return {
      host: this._configService.get<string>('database.host'),
      port: this._configService.get<number>('database.port'),
      db: this._configService.get<string>('database.db'),
    };
  }

  getSmtpConfig(): ISMTPConfig {
    return {
      host: this._configService.get<string>('smtp.host'),
      port: this._configService.get<number>('smtp.port'),
      email: this._configService.get<string>('smtp.email'),
      password: this._configService.get<string>('smtp.password'),
    };
  }

  getLoggerConfig(): ILoggerConfig {
    return {
      enabled: this._configService.get<boolean>('logger.enabled'),
      level: this._configService.get<LoggerLevel>('logger.level'),
      inFile: this._configService.get<boolean>('logger.inFile'),
    };
  }
}
