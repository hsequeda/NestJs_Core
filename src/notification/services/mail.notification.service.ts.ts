import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export enum MailType {
  WELCOME = 'welcome',
  FORGOT_PASSWORD = 'forgot-password',
}

@Injectable()
export class MailNotificationService {
  constructor(@Inject() private readonly _mailerService: MailerService) {}

  public async send(
    to: string,
    type: MailType,
    subject?: string,
    data?: any,
  ): Promise<any> {
    return this._mailerService.sendMail({
      to: to,
      subject: subject,
      template: type,
      context: { ...data },
    });
  }

  //@Cron(CronExpression.EVERY_5_SECONDS)
  private test() {
    this.send('dariel87@gmail.com', MailType.WELCOME, 'Bienvenido De prueba', {
      user: {
        avatarUrl:
          'https://img2.freepng.es/20180323/pww/kisspng-computer-icons-clip-art-profile-cliparts-free-5ab5a47b02ff75.0880050915218535630123.jpg',
        firstname: 'Dariel',
        lastname: 'Noa Graveran',
        email: 'dariel87@gmail.com',
      },
    });
  }
}
