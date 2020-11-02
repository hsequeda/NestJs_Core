import { BaseEntity } from 'src/core/entity/base.entity';

export interface IPaginatedData<T> {
  total: number;
  pages?: number;
  currentPage?: number;
  items: T[];
}
