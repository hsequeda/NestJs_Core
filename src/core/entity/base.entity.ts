import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn() id: number;
}
