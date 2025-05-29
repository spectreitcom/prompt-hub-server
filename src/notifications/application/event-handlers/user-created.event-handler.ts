import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../../../accounts/domain';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  async handle(event: UserCreatedEvent): Promise<void> {
    ///....
  }
}
