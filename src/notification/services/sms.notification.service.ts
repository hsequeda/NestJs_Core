import { Injectable, HttpService } from '@nestjs/common';

export enum MailType {
  WELCOME = 'welcome',
  FORGOT_PASSWORD = 'forgot-password',
}

@Injectable()
export class SMSNotificationService {
  private apiKey: String = process.env.MSG91_API_KEY;
  constructor(private httpService: HttpService) {}

  async sendOTP(): Promise<any> {
    const response = await this.httpService
      .get(process.env.API_URL, {
        auth: {
          username: process.env.API_USER,
          password: process.env.API_PASSWORD,
        },
      })
      .toPromise();
    return response.data;
  }

  public send(phones: string, message: string): void {}

  //@Cron(CronExpression.EVERY_5_SECONDS)
  private sendtest() {}
}
