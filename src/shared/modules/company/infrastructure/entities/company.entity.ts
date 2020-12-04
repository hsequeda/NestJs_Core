import { Entity, Column } from 'typeorm';
import { PersistentEntity } from 'src/shared/modules/data-access/typeorm/base.entity';

@Entity('company')
export class CompanyEntity extends PersistentEntity {
  @Column({ type: 'varchar2', name: 'code' })
  code: string;
  @Column({ type: 'varchar2', name: 'name' })
  name: string;
  @Column({ type: 'boolean', name: 'active', default: true })
  active: boolean;
}
