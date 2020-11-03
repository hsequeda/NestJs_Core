export interface IPaginatedData<T> {
  total: number;
  pages?: number;
  currentPage?: number;
  items: T[];
}
