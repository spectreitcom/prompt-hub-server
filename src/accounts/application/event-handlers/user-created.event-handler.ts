import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { UserCreatedEvent } from '../../domain';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  private readonly logger = new Logger(UserCreatedEventHandler.name);

  async handle(event: UserCreatedEvent): Promise<void> {
    this.logger.log(`User created: ${event.userId.getValue()}`);

    // Here you can add any side effects that should happen when a user is created
    // For example:
    // - Send a welcome email
    // - Create a default profile
    // - Initialize user settings
    // - etc.
  }
}
