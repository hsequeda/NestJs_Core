import { Module } from '@nestjs/common';
import { MailNotificationService } from './services/mail.notification.service.ts';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          port: +process.env.SMTP_PORT,
          tls: {
            rejectUnauthorized: false,
          },
          secure: +process.env.SMTP_PORT === 465 ? true : false,
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        },
        defaults: {
          from: `APP-NAME <${process.env.SMTP_EMAIL}>`,
        },
        template: {
          dir: join(__dirname, '..', '..', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailNotificationService],
  exports: [MailNotificationService],
})
export class NotificationModule {}
