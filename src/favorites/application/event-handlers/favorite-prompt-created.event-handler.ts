import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { FavoritePromptCreatedEvent } from '../../domain';

@EventsHandler(FavoritePromptCreatedEvent)
export class FavoritePromptCreatedEventHandler
  implements IEventHandler<FavoritePromptCreatedEvent>
{
  private readonly logger = new Logger(FavoritePromptCreatedEventHandler.name);

  handle(event: FavoritePromptCreatedEvent) {
    this.logger.debug(
      `Favorite prompt ${event.id.getValue()} created for prompt ${event.promptId.getValue()} by user ${event.userId.getValue()}`,
    );
  }
}
