import { BaseEvent } from './base.event';
import { BaseEntity } from 'src/core/entity/base.entity';

export class CreateEvent extends BaseEvent {
  constructor(public newInstance: BaseEntity) {
    super();
  }
}
