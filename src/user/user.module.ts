import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { CqrsModule } from '@nestjs/cqrs';

import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserResolver } from './resolver/user.resolver';
import { NotificationModule } from 'src/notification/notification.module';
import { SchemaConstants } from 'src/common/constants/schema.constants';
import { UserQueryHandlers } from './queries/handlers';
import { UserCommandHandlers } from './commands/handlers';
import { UserEventHandlers } from 'src/user/events/handlers';
import { FilesModule } from 'src/files/files.module';


@Module({
	imports: [CqrsModule, NotificationModule, FilesModule, TypegooseModule.forFeature([
		{
			typegooseClass: User,
			...SchemaConstants
		}
	]),

	],
	providers: [UserService, UserRepository, UserResolver, 
		...UserQueryHandlers, ...UserCommandHandlers, ...UserEventHandlers],
	exports: [UserService, UserRepository]
})
export class UserModule { }
