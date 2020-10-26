import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailNotificationService, MailType } from 'src/notification/services/mail.notification.service.ts';
import { File } from 'src/files/entities/file.entity';
import { UpdateOneEvent } from 'src/core/events/impl/updateone.event';
import { ForgotPasswordUserEvent } from '../impl/forgot-password-user.event';

@EventsHandler(ForgotPasswordUserEvent)
export class ForgotPasswordUserEventHandler implements IEventHandler<UpdateOneEvent> {
	constructor(private readonly mailService: MailNotificationService) { }

	handle(event: ForgotPasswordUserEvent) {
		this.mailService.send(event.updatedUser.email, MailType.FORGOT_PASSWORD,
			'Contraseña Regenerada',
			{
				firstname: event.updatedUser.firstname,
				lastname: event.updatedUser.lastname,
				avatarUrl: (event.updatedUser.avatarFile as File).url,
				password: event.password 
			});

	}
}