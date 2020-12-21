import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedCompanyEvent } from '../../domain/events/deleted-company.event';
import { Inject, Logger } from '@nestjs/common';
import { PUB_SUB } from 'src/shared/modules/graphql/gql-pubsub.provider';
import { CompanyEvents } from '../../domain/events/company-events.enum';
import { PubSub } from 'apollo-server-express';

@EventsHandler(DeletedCompanyEvent)
export class DeletedCompanyHandler
  implements IEventHandler<DeletedCompanyEvent> {
  private _logger: Logger;
  constructor(@Inject(PUB_SUB) private readonly _pubsub: PubSub) {
    this._logger = new Logger('CreatedCompanyEventHandler');
  }

  handle({ id, version }: DeletedCompanyEvent) {
    this._logger.log('Publish deletedCompany event');
    this._pubsub.publish(CompanyEvents.DELETED, {
      onCompanyDeleted: { id, version },
    });
  }
}
