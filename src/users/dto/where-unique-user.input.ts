import { InputType, Field, ID } from '@nestjs/graphql';
import { IWhereUnique } from 'src/core/interfaces/IWhereUniqueInput';
import { User } from '../entities/user.entity';

@InputType()
export class WhereUniqueUserInput implements IWhereUnique<User> {
  @Field(() => String)
  username?: string;
  @Field(() => String)
  email?: string;
  @Field(() => ID)
  id?: string;
}
