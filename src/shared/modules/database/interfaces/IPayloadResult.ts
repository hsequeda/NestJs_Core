/**
 * Generic findAll payload with pagination included.
 *
 * @export
 * @interface IPayloadResult
 * @template T
 */
export interface IPayloadResult<T> {
  items: T[];
  limit: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
