import { BaseEntity } from "src/core/entity/base.entity";

export interface IPaginatedData<T extends BaseEntity> {
	total: number;
	pages?: number;
	currentPage?: number;
	items: T[];
}