import { BaseEvent } from './base.event';

export class DeleteOneEvent extends BaseEvent {
  constructor(public deletedInstance: any) {
    super();
  }
}
