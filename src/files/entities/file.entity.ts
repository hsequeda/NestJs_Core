import { prop } from "@typegoose/typegoose";
import { BaseEntity } from "src/core/entity/base.entity";
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';


export enum FileType {
	AUDIO = 'AUDIO',
	VIDEO = 'VIDEO',
	PICTURE = 'PICTURE',
	OTHER = 'OTHER'
}

@ObjectType()
export class File extends BaseEntity {
	@prop() public_id?: string;
	@prop() url?: string;
	@prop() format?: string;
	@prop() bytes?: number;
	@Field(type => FileType) @prop({ default: FileType.OTHER }) type?: FileType;
}

registerEnumType(FileType, {
	name: 'FileType'
});

