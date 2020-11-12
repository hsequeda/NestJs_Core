import { InputType, Field } from '@nestjs/graphql';
import { Book } from '../entities/book.entity';
import { IWhere } from 'src/core/interfaces/IWhereInput';
import { StringFieldOptions } from 'src/shared/dto/string-field-options.input';
import { DateFieldOptions } from 'src/shared/dto/date-field-options.input';
import { UserFieldOptions } from './user-field-options.input';
import { User } from 'src/users/entities/user.entity';
import { IFieldOptions } from 'src/core/interfaces/IFieldOptions';

@InputType()
export class WhereBookInput implements IWhere<Book> {
  @Field(() => StringFieldOptions)
  id?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  name?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  description?: StringFieldOptions;
  @Field(() => UserFieldOptions, { nullable: true })
  user?: IFieldOptions<User>;
  @Field(() => DateFieldOptions)
  createdAt?: DateFieldOptions;
  @Field(() => DateFieldOptions)
  updatedAt?: DateFieldOptions;
}
