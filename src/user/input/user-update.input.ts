import { InputType, PartialType } from '@nestjs/graphql';
import { UserInput } from './user.input';

@InputType()
export class UserUpdateInput extends PartialType(UserInput) {}
