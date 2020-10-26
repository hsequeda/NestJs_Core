import { Module, HttpModule } from '@nestjs/common';
import { MailNotificationService } from './services/mail.notification.service.ts'
import { SMSNotificationService } from './services/sms.notification.service';



@Module({
	imports: [HttpModule.register({
		timeout: 30000,
		maxRedirects: 10,
	})],
	controllers: [],
	providers: [MailNotificationService, SMSNotificationService],
	exports: [MailNotificationService, SMSNotificationService]
})

export class NotificationModule { }
