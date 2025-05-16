import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NotificationCreatedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(NotificationCreatedEvent)
export class NotificationCreatedHandler
  implements IEventHandler<NotificationCreatedEvent>
{
  private readonly logger = new Logger(NotificationCreatedHandler.name);

  async handle(event: NotificationCreatedEvent): Promise<void> {
    this.logger.debug(JSON.stringify(event));
  }
}
