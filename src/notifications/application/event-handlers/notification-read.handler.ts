import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NotificationReadEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(NotificationReadEvent)
export class NotificationReadHandler
  implements IEventHandler<NotificationReadEvent>
{
  private readonly logger = new Logger(NotificationReadHandler.name);
  async handle(event: NotificationReadEvent): Promise<void> {
    this.logger.debug(JSON.stringify(event));
  }
}
