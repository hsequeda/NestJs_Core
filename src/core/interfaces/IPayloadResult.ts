export interface IPayloadResult<T> {
  items: T[];
  limit: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
