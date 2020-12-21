import { Entity, Column, Index } from 'typeorm';
import { PersistentEntity } from 'src/shared/modules/data-access/typeorm/base.entity';

@Entity('company')
@Index(['code', 'deletedAt'], { unique: true })
@Index(['name', 'deletedAt'], { unique: true })
export class CompanyEntity extends PersistentEntity {
  @Column({ type: 'varchar2', name: 'code' })
  code: string;
  @Column({ type: 'varchar2', name: 'name' })
  name: string;
  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;
  // @OneToMany(
  //   () => CompanyRegEntity,
  //   reg => reg.company,
  // )
  // registers: CompanyRegEntity[];
  @Column({ type: 'number', name: 'version' })
  version: number;
}
