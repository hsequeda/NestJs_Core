import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedCompanyEvent } from '../domain/events/create-company.event';
import { Inject } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';

@EventsHandler(CreatedCompanyEvent)
export class CreatedCompanyHandler
  implements IEventHandler<CreatedCompanyEvent> {
  constructor(@Inject('PUB_SUB') private readonly _pubsub: PubSub) {}

  handle(event: CreatedCompanyEvent) {
    this._pubsub.publish('CreatedCompany', {
      companyId: event.id,
      companyVersion: event.version,
    });
  }
}
