import { BaseEvent } from './base.event';
import { BaseEntity } from 'src/core/entity/base.entity';

export class UpdateOneEvent extends BaseEvent {
  constructor(public updatedInstance: BaseEntity) {
    super();
  }
}
