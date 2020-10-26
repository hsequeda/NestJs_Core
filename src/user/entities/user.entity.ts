import { prop, Ref } from '@typegoose/typegoose';
import { BaseEntity } from 'src/core/entity/base.entity';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { File } from 'src/files/entities/file.entity';


export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NOT_SPECIFIED = 'NOT_SPECIFIED'
}

@ObjectType()
export class User extends BaseEntity {
  @prop({ required: true, unique: true }) email: string;
  @prop({ required: true }) firstname: string;
  @prop() lastname?: string;
  @prop({ select: false, minlength: 6 }) password: string;
  @prop() phone?: string;
  @prop() birthday?: Date;
  @Field(type => Gender) @prop({ default: Gender.NOT_SPECIFIED }) gender?: Gender;

  @Field(type => [Roles]) @prop({ type: String }) roles?: Roles[];
  @prop({ default: false }) checked_register?: boolean;

  @Field(type => File) @prop({ ref: File }) avatarFile?: Ref<File>;

  constructor() {
    super();
    this.roles = [Roles.USER];
    this.checked_register = false;
    this.gender = Gender.NOT_SPECIFIED;
  }
}

registerEnumType(Roles, {
  name: 'Roles',
});

registerEnumType(Gender, {
  name: 'Gender',
});