import { BaseEvent } from './base.event';

export class UpdateEvent extends BaseEvent {
  constructor(public updateResult: any) {
    super();
  }
}
