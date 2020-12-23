import { ValueObject } from '../domain/value-object.abstract';
import { Guard } from './Guard';
import { Result } from './Result';
import { AppError } from './errors/AppError';

export interface PageParamsDto {
  pageNum: number;
  pageLimit: number;
}

interface PageParamsProps {
  pageNum: number;
  pageLimit: number;
}

export class PageParams extends ValueObject<PageParamsProps> {
  static pageMinValue = 1;
  static pageLimitMinValue = 1;

  get pageLimit(): number {
    return this.props.pageLimit;
  }

  get pageNum(): number {
    return this.props.pageNum;
  }

  static create(props: PageParamsProps): Result<PageParams> {
    const pageLimitIsGreaterThanResult = Guard.greaterThanEqual(
      this.pageLimitMinValue,
      props.pageLimit,
      'pageLimit',
    );

    if (!pageLimitIsGreaterThanResult.succeeded)
      return new AppError.ValidationError(pageLimitIsGreaterThanResult);
    const pageNumIsGreaterThanResult = Guard.greaterThanEqual(
      this.pageMinValue,
      props.pageNum,
      'pageNum',
    );

    if (!pageNumIsGreaterThanResult.succeeded)
      return new AppError.ValidationError(pageNumIsGreaterThanResult);

    return Result.ok(new PageParams(props));
  }
}
