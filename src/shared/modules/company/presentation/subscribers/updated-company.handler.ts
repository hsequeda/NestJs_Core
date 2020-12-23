import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { PUB_SUB } from 'src/shared/modules/graphql/gql-pubsub.provider';
import { PubSub } from 'graphql-subscriptions';
import { CompanyEvents } from '../../domain/events/company-events.enum';
import { UpdatedCompanyEvent } from '../../domain/events/updated-company.event';

@EventsHandler(UpdatedCompanyEvent)
export class UpdatedCompanyHandler
  implements IEventHandler<UpdatedCompanyEvent> {
  private _logger: Logger;
  constructor(@Inject(PUB_SUB) private readonly _pubsub: PubSub) {
    this._logger = new Logger('UpdatedCompanyEventHandler');
  }

  handle({ id, version, name, code }: UpdatedCompanyEvent) {
    this._logger.log('Publish UpdatedCompany event');
    this._pubsub.publish(CompanyEvents.CREATED, {
      onCompanyUpdated: {
        id,
        version,
        code,
        name,
      },
    });
  }
}
