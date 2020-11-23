import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IEntity } from '../interfaces/IEntity';

export abstract class PersistentEntity implements IEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
