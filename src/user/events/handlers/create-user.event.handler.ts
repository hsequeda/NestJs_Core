import { EventsHandler } from '@nestjs/cqrs';
import { CreateUserEvent } from '../impl/create-user.event';

import { CreateEventHandler } from 'src/core/events/handlers/create.event.handler';
import { AppLoggerService } from 'src/logger/service/app-logger.service';

@EventsHandler(CreateUserEvent)
export class CreateUserEventHandler extends CreateEventHandler {
  constructor(private readonly _loggerService: AppLoggerService) {
    super();
    this._loggerService.setContext('CreateUserEventHandler');
  }

  handle(event: CreateUserEvent) {
    super.handle(event);
    this._loggerService.debug(
      `Create a new user with email: ${event.newInstance.email}`,
    );
  }
}
