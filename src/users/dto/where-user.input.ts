import { InputType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IWhere } from 'src/core/interfaces/IWhereInput';
import { BooleanFieldOptions } from 'src/shared/dto/boolean-field-options.input';
import { StringFieldOptions } from 'src/shared/dto/string-field-options.input';
import { NumberFieldOptions } from 'src/shared/dto/number-field-options.input';
import { IQualitativeFieldOptions } from 'src/core/interfaces/IQualitativeFieldOptions';
import { IFieldOptions } from 'src/core/interfaces/IFieldOptions';
import { IQuantitativeFieldOptions } from 'src/core/interfaces/IQuantitativeFieldOptions';
import { DateFieldOptions } from 'src/shared/dto/date-field-options.input';

@InputType()
export class WhereUserInput implements IWhere<User> {
  @Field(() => StringFieldOptions)
  username?: IQualitativeFieldOptions<string>;
  @Field(() => StringFieldOptions)
  email?: IQualitativeFieldOptions<string>;
  @Field(() => BooleanFieldOptions)
  active?: IFieldOptions<boolean>;
  @Field(() => NumberFieldOptions)
  id?: IQualitativeFieldOptions<string>;
  @Field(() => DateFieldOptions)
  createdAt?: IQuantitativeFieldOptions<Date>;
  @Field(() => DateFieldOptions)
  updatedAt?: IQuantitativeFieldOptions<Date>;
}
