import { InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseInput } from 'src/core/input/base.input';
import { FileInput } from 'src/files/input/file.input';
import { Gender } from '../entities/user.entity';

@InputType()
export class UserInput extends BaseInput {
	@IsEmail() email: string
	password: string
	firstname: string
	lastname?: string
	avatarFile?: FileInput
	gender?: Gender
}