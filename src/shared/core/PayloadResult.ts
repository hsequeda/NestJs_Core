/**
 * Generic paginatedFind payload with pagination included.
 *
 * @export
 * @interface IPayloadResult
 * @template T
 */
export type PayloadResult<T> = {
  items: T[];
  limit: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
};

export const defaultPayloadResult: PayloadResult<any> = {
  items: [],
  limit: 0,
  currentPage: 0,
  totalPages: 0,
  totalItems: 0,
};
