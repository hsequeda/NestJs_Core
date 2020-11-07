import { InputType } from '@nestjs/graphql';
import { getQuantitativeFieldOptions } from 'src/core/interfaces/IQuantitativeFieldOptions';

@InputType()
export class DateFieldOptions extends getQuantitativeFieldOptions(Date) {}
