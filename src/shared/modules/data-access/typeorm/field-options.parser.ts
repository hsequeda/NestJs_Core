import { FieldOptions, FieldOptionsKeys } from '../types/IFieldOptions';
import {
  QualitativeFieldOptions,
  QualitativeFieldOptionsKeys,
} from '../types/IQualitativeFieldOptions';
import {
  IQuantitativeFieldOptions,
  QuantitativeFieldOptionsKeys,
} from '../types/IQuantitativeFieldOptions';
import {
  Equal,
  IsNull,
  Any,
  Not,
  In,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Between,
} from 'typeorm';
import { has } from 'lodash';

export class TypeORMDataAccessUtils {
  static parseFieldOption<T>(fieldOption: FieldOptions<T>): any {
    switch (true) {
      case has(fieldOption, FieldOptionsKeys.IS_NULL):
        return IsNull();
      case has(fieldOption, FieldOptionsKeys.ANY):
        return Any(fieldOption[FieldOptionsKeys.ANY] as T[]);
      case has(FieldOptionsKeys, FieldOptionsKeys.IS):
        return Equal(fieldOption[FieldOptionsKeys.IS]);
      case has(FieldOptionsKeys, FieldOptionsKeys.NOT):
        return Not(Equal(fieldOption[FieldOptionsKeys.NOT]));
      case has(FieldOptionsKeys, FieldOptionsKeys.IN):
        return In(fieldOption[FieldOptionsKeys.IN] as T[]);
      case has(FieldOptionsKeys, FieldOptionsKeys.NOT_IN):
        return Not(In(fieldOption[FieldOptionsKeys.NOT_IN] as T[]));
      default:
        return fieldOption;
    }
  }

  static parseQualitativeFieldOption(
    strFieldOption: QualitativeFieldOptions,
  ): any {
    switch (true) {
      case has(strFieldOption, QualitativeFieldOptionsKeys.CONTAINS):
        return ILike(
          `%${strFieldOption[QualitativeFieldOptionsKeys.CONTAINS]}%`,
        );
      case has(strFieldOption, QualitativeFieldOptionsKeys.NOT_CONTAINS):
        return Not(
          ILike(
            `%${strFieldOption[QualitativeFieldOptionsKeys.NOT_CONTAINS]}%`,
          ),
        );
      case has(strFieldOption, QualitativeFieldOptionsKeys.STARTS_WITH):
        return ILike(
          `${strFieldOption[QualitativeFieldOptionsKeys.STARTS_WITH]}%`,
        );
      case has(strFieldOption, QualitativeFieldOptionsKeys.NOT_STARTS_WITH):
        return Not(
          ILike(
            `${strFieldOption[QualitativeFieldOptionsKeys.NOT_STARTS_WITH]}%`,
          ),
        );
      case has(strFieldOption, QualitativeFieldOptionsKeys.ENDS_WITH):
        return ILike(
          `%${strFieldOption[QualitativeFieldOptionsKeys.ENDS_WITH]}`,
        );
      case has(strFieldOption, QualitativeFieldOptionsKeys.NOT_ENDS_WITH):
        return Not(
          ILike(
            `%${strFieldOption[QualitativeFieldOptionsKeys.NOT_ENDS_WITH]}`,
          ),
        );
      default:
        return this.parseFieldOption(strFieldOption);
    }
  }

  static parseQuantitativeFieldOption(
    numFieldOption: IQuantitativeFieldOptions,
  ): any {
    switch (true) {
      case has(numFieldOption, QuantitativeFieldOptionsKeys.LT):
        return LessThan(numFieldOption[QuantitativeFieldOptionsKeys.LT]);
      case has(numFieldOption, QuantitativeFieldOptionsKeys.LTE):
        return LessThanOrEqual(
          numFieldOption[QuantitativeFieldOptionsKeys.LTE],
        );
      case has(numFieldOption, QuantitativeFieldOptionsKeys.GT):
        return MoreThan(numFieldOption[QuantitativeFieldOptionsKeys.GT]);
      case has(numFieldOption, QuantitativeFieldOptionsKeys.GTE):
        return MoreThanOrEqual(
          numFieldOption[QuantitativeFieldOptionsKeys.GTE],
        );
      case has(numFieldOption, QuantitativeFieldOptionsKeys.BETWEEN):
        return Between(
          numFieldOption[QuantitativeFieldOptionsKeys.BETWEEN].from,
          numFieldOption[QuantitativeFieldOptionsKeys.BETWEEN].to,
        );
      default:
        return this.parseFieldOption(numFieldOption);
    }
  }
}
