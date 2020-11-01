import { BaseEvent } from './base.event';

export class DeleteEvent extends BaseEvent {
  constructor(public deleteResult: any) {
    super();
  }
}
