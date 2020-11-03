import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDataBaseConfig } from '../interfaces/IDataBaseConfig';
import { IAppConfig } from '../interfaces/IAppConfig';
import { ISMTPConfig } from '../interfaces/ISMTPConfig';
import { ILoggerConfig, LoggerLevel } from '../interfaces/ILoggerConfig';
import { IGraphqlConfig } from '../interfaces/IGraphqlConfig';

@Injectable()
export class AppConfigService {
  constructor(private readonly _configService: ConfigService) {}

  app: IAppConfig = {
    cors: this._configService.get<boolean>('app.cors'),
    port: this._configService.get<number>('app.port'),
    nodeEnv: this._configService.get<string>('app.nodeEnv'),
  };

  database: IDataBaseConfig = {
    type: this._configService.get<string>('database.type'),
    username: this._configService.get<string>('database.username'),
    password: this._configService.get<string>('database.password'),
    connectionString:
      this._configService.get<string>('database.connectionString') ?? undefined,
    host: this._configService.get<string>('database.host') ?? undefined,
    database: this._configService.get<string>('database.database') ?? undefined,
  };

  smtp: ISMTPConfig = {
    host: this._configService.get<string>('smtp.host'),
    port: this._configService.get<number>('smtp.port'),
    email: this._configService.get<string>('smtp.email'),
    password: this._configService.get<string>('smtp.password'),
  };

  logger: ILoggerConfig = {
    level: this._configService.get<LoggerLevel>('logger.level'),
  };

  graphql: IGraphqlConfig = {
    schema: this._configService.get<LoggerLevel>('graphql.schema'),
    maxFiles: this._configService.get<number>('graphql.maxFiles'),
    maxFileSize: this._configService.get<number>('graphql.maxFileSize'),
    depthLimit: this._configService.get<number>('graphql.depthLimit'),
  };
}
