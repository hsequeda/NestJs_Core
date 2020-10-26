import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { generate } from 'generate-password';
import { ReturnModelType } from '@typegoose/typegoose';
import { BaseRepository } from 'src/core/repository/base.repository'
import { User, Roles, Gender } from '../entities/user.entity';
import PasswordUtils from 'src/common/utils/password.utils'
import { UserInput } from '../input/user.input';
import { IPaginatorParams } from 'src/core/interfaces/IPaginatorParams';
import { PaginatedUsers } from '../dto/paginated.users.dto';
import { MailNotificationService, MailType } from 'src/notification/services/mail.notification.service.ts';
import { File, FileType } from 'src/files/entities/file.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {

	constructor(@InjectModel(User) private readonly userService: ReturnModelType<typeof User>	) {
		super(userService);
	}



}
