import { InputType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IWhere } from 'src/core/interfaces/IWhereInput';
import { StringFieldOptions } from 'src/shared/dto/string-field-options.input';
import { DateFieldOptions } from 'src/shared/dto/date-field-options.input';
import { BooleanFieldOptions } from 'src/shared/dto/boolean-field-options.input';

@InputType()
export class WhereUserInput implements IWhere<User> {
  @Field(() => StringFieldOptions)
  username?: StringFieldOptions;
  @Field(() => StringFieldOptions)
  email?: StringFieldOptions;
  @Field(() => BooleanFieldOptions)
  active?: BooleanFieldOptions;
  @Field(() => StringFieldOptions)
  id?: StringFieldOptions;
  @Field(() => DateFieldOptions)
  createdAt?: DateFieldOptions;
  @Field(() => DateFieldOptions)
  updatedAt?: DateFieldOptions;
}
