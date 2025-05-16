import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NotificationUnreadEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(NotificationUnreadEvent)
export class NotificationUnreadHandler
  implements IEventHandler<NotificationUnreadEvent>
{
  private readonly logger = new Logger(NotificationUnreadHandler.name);

  async handle(event: NotificationUnreadEvent): Promise<void> {
    this.logger.debug(JSON.stringify(event));
  }
}
