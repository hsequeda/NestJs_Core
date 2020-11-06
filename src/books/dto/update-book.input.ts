import { PartialType } from '@nestjs/mapped-types';
import { CreateBookInput } from './create-book.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => Int)
  id: number;
}