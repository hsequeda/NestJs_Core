import { BaseEvent } from './base.event';
import { BaseEntity } from 'src/core/entity/base.entity';

export class DeleteOneEvent extends BaseEvent {
  constructor(public deletedInstance: BaseEntity) {
    super();
  }
}
