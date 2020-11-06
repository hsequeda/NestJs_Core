import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
}