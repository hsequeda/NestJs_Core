import { prop } from "@typegoose/typegoose";
import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'timestamp' }) createdAt?: Date;
  @Column({ type: 'timestamp' }) updatedAt?: Date;
}

