import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/app-config.module';
import { UserModule } from './user/user.module';
import { AppConfigService } from './config/service/app-config-service';
import { ConnectionOptions } from 'typeorm';
import { AppResolver } from './app.resolver';
import * as depthLimit from 'graphql-depth-limit';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      async useFactory(config: AppConfigService) {
        return {
          entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
          ...config.database,
        } as ConnectionOptions;
      },
    }),
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
            maxFileSize: config.graphql.maxFileSize, // 10 MB
            maxFiles: config.graphql.maxFiles,
          },
        };
      },
    }),
    AppConfigModule,
    UserModule,
  ],

  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
