import { IFieldOptions } from './IFieldOptions';

export interface IQualitativeFieldOptions extends IFieldOptions<string> {
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

export enum QualitativeFieldOptionsKeys {
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  STARTS_WITH = 'starts_with',
  NOT_STARTS_WITH = 'not_starts_with',
  ENDS_WITH = 'ends_with',
  NOT_ENDS_WITH = 'not_ends_with',
}
