import { CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { IPersistentEntity } from '../interfaces/IEntity';

export abstract class PersistentEntity implements IPersistentEntity {
  @PrimaryColumn()
  id: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
