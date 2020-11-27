import { PersistentEntity } from 'src/shared/modules/database/typeorm/base.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'orientation' })
export class OrientationEntity extends PersistentEntity {
  @PrimaryColumn({ name: 'company_id' })
  companyId: string;
  @Column({ type: 'varchar2', name: 'code' })
  code: string;
  @Column({ type: 'varchar2', name: 'name' })
  name: string;
  @Column({ type: 'boolean', name: 'active' })
  active: boolean;
}
