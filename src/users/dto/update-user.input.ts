import { InputType, OmitType } from '@nestjs/graphql';
import { UpdateOneUserInput } from './updateone-user.input';

@InputType()
export class UpdateUserInput extends OmitType(UpdateOneUserInput, [
  'email',
  'username',
] as const) {}
