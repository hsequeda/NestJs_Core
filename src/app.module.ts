import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppResolver } from './app.resolver';
import { AppConfigModule } from './config/app-config.module';
import { AppLoggerModule } from './logger/app-logger.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    GraphQLModule.forRoot({
      context: ({ req, connection }) => {
        // Return connection context when is a Subscription
        return connection ? { req: connection.context } : { req };
      },
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      debug: true,
      introspection: true,
      playground: true,
      cors: false,
      subscriptions: {
        onConnect: connectionParams => {
          return { connectionParams };
        },
      },
      uploads: {
        maxFileSize: 10000000, // 10 MB
        maxFiles: 2,
      },
    }),

    AppConfigModule,
    AppLoggerModule,
    //NotificationModule,
    UserModule,
  ],

  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
