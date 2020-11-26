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
