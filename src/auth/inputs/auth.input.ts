import { InputType, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/core/input/base.input';
import { IsEmail } from 'class-validator';


@InputType()
export class AuthInput extends BaseInput {
  @IsEmail() @Field(type => String) email: string;
  @Field(type => String) password: string;
}
