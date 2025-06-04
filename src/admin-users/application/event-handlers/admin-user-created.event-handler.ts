import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AdminUserCreatedEvent } from '../../domain/events';
import { Logger } from '@nestjs/common';

@EventsHandler(AdminUserCreatedEvent)
export class AdminUserCreatedEventHandler
  implements IEventHandler<AdminUserCreatedEvent>
{
  private readonly logger = new Logger(AdminUserCreatedEventHandler.name);

  async handle(event: AdminUserCreatedEvent): Promise<void> {
    this.logger.log(
      `Admin user created: ${event.id.toString()}, email: ${event.email.toString()}`,
    );
    // Additional logic can be added here, such as sending a notification or updating other systems
  }
}
