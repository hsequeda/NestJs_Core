import { InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseInput } from 'src/core/input/base.input';

@InputType()
export class UserInput extends BaseInput {
  @IsEmail() email: string;
  firstname: string;
  lastname?: string;
}
