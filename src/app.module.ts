import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';


import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AppConfigModule } from './common/config/app-config.module';
import { AppLoggerModule } from './common/logger/app-logger.module';

@Module({
  imports: [
    AppConfigModule,
    AppLoggerModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/**/*.entity{.ts}'],
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

    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          tls: {
            rejectUnauthorized: false,
          },
          secure: Number(process.env.SMTP_PORT) === 465 ? true : false,
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        },
        defaults: {
          from: `APP-NAME <${process.env.SMTP_EMAIL}>`,
        },
        template: {
          dir: join(__dirname, '..', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],

  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
