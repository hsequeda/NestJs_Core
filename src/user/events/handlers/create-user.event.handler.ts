import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateUserEvent } from '../impl/create-user.event';
import { MailNotificationService, MailType } from 'src/notification/services/mail.notification.service.ts';
import {File} from 'src/files/entities/file.entity';

@EventsHandler(CreateUserEvent)
export class CreateUserEventHandler implements IEventHandler<CreateUserEvent> {
	constructor(private readonly mailService: MailNotificationService) { }

	handle(event: CreateUserEvent) {
		this.mailService.send(event.newInstance.email, MailType.WELCOME,
			'Beinvenido a la plataforma',
			{
				firstname: event.newInstance.firstname,
				lastname: event.newInstance.lastname,
				avatarUrl: (event.newInstance.avatarFile as File).url
			});

	}
}