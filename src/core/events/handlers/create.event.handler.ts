import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateEvent } from '../impl/create.event';

@EventsHandler(CreateEvent)
export class CreateEventHandler implements IEventHandler<CreateEvent> {
  handle(event: CreateEvent) {
    console.log(
      `Launch Event Create: ${Object.getPrototypeOf(event.newInstance)}>}`,
    );
  }
}
