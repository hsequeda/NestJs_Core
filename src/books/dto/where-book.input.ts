import { InputType, Field } from '@nestjs/graphql';
import { Book } from '../entities/book.entity';
import { IWhere } from 'src/core/interfaces/IWhereInput';
import { StringFieldOptions } from 'src/shared/dto/string-field-options.input';

@InputType()
export class WhereBookInput implements IWhere<Book> {
  @Field(() => StringFieldOptions)
  id?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  name?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  description?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  user?: StringFieldOptions;
}
