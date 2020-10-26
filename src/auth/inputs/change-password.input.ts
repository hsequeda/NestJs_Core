import { InputType, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/core/input/base.input';


@InputType()
export class ChangePasswordInput extends BaseInput {
  @Field(type => String) password: string;
  @Field(type => String) new_password: string;
  @Field(type => String) repeat_new_password: string;
}
