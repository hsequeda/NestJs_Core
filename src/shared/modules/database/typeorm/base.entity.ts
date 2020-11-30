import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BaseEntity,
} from 'typeorm';
import { IPersistentEntity } from '../interfaces/IEntity';

export abstract class PersistentEntity extends BaseEntity
  implements IPersistentEntity {
  @PrimaryColumn()
  id: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
