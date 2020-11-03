import { Module } from '@nestjs/common';
import { MailNotificationService } from './services/mail.notification.service.ts';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppConfigModule } from 'src/config/app-config.module';
import { AppConfigService } from 'src/config/service/app-config-service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        transport: {
          host: config.smtp.host,
          port: config.smtp.port,
          tls: {
            rejectUnauthorized: false,
          },
          secure: config.smtp.port === 465 ? true : false,
          auth: {
            user: config.smtp.email,
            pass: config.smtp.password,
          },
        },
        defaults: {
          from: `APP-NAME <${config.smtp.email}>`,
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
