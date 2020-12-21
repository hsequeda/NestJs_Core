import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';
import { CreatedCompanyEvent } from '../../domain/events/created-company.event';
import { PUB_SUB } from 'src/shared/modules/graphql/gql-pubsub.provider';
import { CompanyEvents } from '../../domain/events/company-events.enum';
import { CompanyMap } from '../../infrastructure/mapper/company.mapper';

@EventsHandler(CreatedCompanyEvent)
export class CreatedCompanyHandler
  implements IEventHandler<CreatedCompanyEvent> {
  private _logger: Logger;
  constructor(@Inject(PUB_SUB) private readonly _pubsub: PubSub) {
    this._logger = new Logger('CreatedCompanyEventHandler');
  }

  handle({ newCompany }: CreatedCompanyEvent) {
    this._logger.log('Publish CreatedCompany event');
    this._pubsub.publish(CompanyEvents.CREATED, {
      onCompanyCreated: { company: CompanyMap.DomainToDto(newCompany) },
    });
  }
}
