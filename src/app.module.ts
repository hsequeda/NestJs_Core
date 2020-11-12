import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppConfigModule } from './config/app-config.module';
import { AppConfigService } from './config/service/app-config-service';
import { AppResolver } from './app.resolver';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import * as depthLimit from 'graphql-depth-limit';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      async useFactory(config: AppConfigService) {
        return {
          autoSchemaFile: config.graphql.schema,
          playground: config.app.nodeEnv !== 'production',
          debug: config.app.nodeEnv !== 'production',
          introspection: config.app.nodeEnv !== 'production',
          cors: config.app.cors,
          fieldResolverEnhancers: ['guards', 'interceptors', 'filters'],
          validationRules: [depthLimit(config.graphql.depthLimit)],
          context: ({ req, connection }) => {
            // Return connection context when is a Subscription
            return connection ? { req: connection.context } : { req };
          },
          subscriptions: {
            onConnect: connectionParams => {
              return { connectionParams };
            },
          },
          uploads: {
            maxFileSize: config.graphql.maxFileSize,
            maxFiles: config.graphql.maxFiles,
          },
        };
      },
    }),
    AppConfigModule,
    UsersModule,
    BooksModule,
    DatabaseModule,
  ],

  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {
  static port: number;

  constructor(private readonly _configService: AppConfigService) {
    AppModule.port = this._configService.app.port;
  }
}
