import { InputType, OmitType } from '@nestjs/graphql';
import { UpdateOneBookInput } from './updateone-book.input';

@InputType()
export class UpdateBookInput extends OmitType(UpdateOneBookInput, [
  'name',
] as const) {}
