import { InputType } from '@nestjs/graphql';
import { IQualitativeFieldOptions } from 'src/core/interfaces/IQualitativeFieldOptions';

@InputType()
export class StringFieldOptions implements IQualitativeFieldOptions {
  is_null?: boolean;
  any?: string[];
  is?: string;
  not?: string;
  in?: string[];
  not_in?: string[];
  contains?: string;
  not_contains?: string;
  starts_with?: string;
  not_starts_with?: string;
  ends_with?: string;
  not_ends_with?: string;
}
