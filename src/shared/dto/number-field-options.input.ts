import { InputType } from '@nestjs/graphql';
import { getQuantitativeFieldOptions } from 'src/core/interfaces/IQuantitativeFieldOptions';

@InputType()
export class NumberFieldOptions extends getQuantitativeFieldOptions(Number) {}
