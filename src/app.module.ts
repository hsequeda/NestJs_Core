import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';

import { TypegooseModule } from "nestjs-typegoose";

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypegooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }),
  ScheduleModule.forRoot(),

  GraphQLModule.forRoot({
    context: ({ req, connection }) => {
      // Return conection context when is a Subscription
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
      maxFiles: 2
    }
  }),

  MailerModule.forRootAsync({
    useFactory: () => ({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        tls: {
          rejectUnauthorized: false
        },
        secure: Number(process.env.SMTP_PORT) === 465 ? true : false,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        }
      },
      defaults: {
        from: `APP-NAME <${process.env.SMTP_EMAIL}>`
      },
      template: {
        dir: join(__dirname, '..', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        },
      },

    })
  }),
    UserModule, AuthModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
