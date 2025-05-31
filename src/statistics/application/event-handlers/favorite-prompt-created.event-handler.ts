import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FavoritePromptCreatedEvent } from '../../../favorites/domain';

@EventsHandler(FavoritePromptCreatedEvent)
export class FavoritePromptCreatedEventHandler
  implements IEventHandler<FavoritePromptCreatedEvent>
{
  constructor() {}

  async handle(event: FavoritePromptCreatedEvent) {
    //..
  }
}
