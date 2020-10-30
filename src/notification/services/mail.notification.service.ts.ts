import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

export enum MailType {
	WELCOME = 'welcome',
	FORGOT_PASSWORD = 'forgot-password'
}

@Injectable()
export class MailNotificationService {

	constructor(private readonly mailerService: MailerService) { }

	public send(to: string, type: MailType, subject?: string, data?: any): void {
		this.mailerService
			.sendMail({
				to: to,
				subject: subject,
				template: type,
				context: { ...data },
			})
			.then((res) => {
				Logger.log(`Sending email to: ${to}, of type: ${type}`, 'MailNotificationService')
			})
			.catch((e) => { Logger.log(e,'MailNotificationService') });
	}


	//@Cron(CronExpression.EVERY_5_SECONDS)
	private test() {
		console.log('test mail')
		this.send('dariel87@gmail.com', MailType.WELCOME, 'Bienvenido De prueba',
			{
				user: {
					avatarUrl: 'https://img2.freepng.es/20180323/pww/kisspng-computer-icons-clip-art-profile-cliparts-free-5ab5a47b02ff75.0880050915218535630123.jpg',
					firstname: 'Dariel',
					lastname: 'Noa Graveran',
					email: 'dariel87@gmail.com'
				}

			});
	}


}
