import { ValueObject } from '../domain/value-object.abstract';
import { Guard } from './Guard';
import { Result } from './Result';

interface PaginatorParamsProps {
  pageNum: number;
  pageLimit: number;
}

export class PaginatorParams extends ValueObject<PaginatorParamsProps> {
  static pageMinValue = 1;
  static pageLimitMinValue = 1;

  get pageLimit(): number {
    return this.props.pageLimit;
  }

  get pageNum(): number {
    return this.props.pageNum;
  }

  static create(props: PaginatorParamsProps): Result<PaginatorParams> {
    const pageLimitIsGreaterThanResult = Guard.greaterThanEqual(
      this.pageLimitMinValue,
      props.pageLimit,
      'pageLimit',
    );

    if (!pageLimitIsGreaterThanResult.succeeded)
      return Result.fail(pageLimitIsGreaterThanResult);
    const pageNumIsGreaterThanResult = Guard.greaterThanEqual(
      this.pageMinValue,
      props.pageNum,
      'pageNum',
    );

    if (!pageNumIsGreaterThanResult.succeeded)
      return Result.fail(pageNumIsGreaterThanResult);

    return Result.ok(new PaginatorParams(props));
  }
}
