import { InputType, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/core/input/base.input';
import { FileType } from '../entities/file.entity';

@InputType()
export class FileInput extends BaseInput {
	public_id?: string;
	@Field(type => FileType) type?: FileType;
	url?: string;
}