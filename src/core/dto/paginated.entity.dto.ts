import {IPaginatedData} from 'src/core/interfaces/IPaginatedData';
import { ObjectType , Field, Int} from '@nestjs/graphql';
import { ClassType } from 'type-graphql';  

export default function PaginatedData<T>(Type: ClassType<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedDataClass implements IPaginatedData<T> {
    @Field(type => [Type]) items: T[];
		@Field(type => Int) total: number;
		@Field(type => Int) pages: number;
		@Field(type => Int) currentPage: number;    
  }
  return PaginatedDataClass;
}

