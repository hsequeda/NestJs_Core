import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class LoggedInPayload {
  @Field(() => User) user: User;
  @Field(() => String) jwt: string;
}
