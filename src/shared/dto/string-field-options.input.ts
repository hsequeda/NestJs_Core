import { getQualitativeFieldOptions } from 'src/core/interfaces/IQualitativeFieldOptions';
import { InputType } from '@nestjs/graphql';

@InputType()
export class StringFieldOptions extends getQualitativeFieldOptions(String) {}
