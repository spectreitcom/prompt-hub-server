import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { FavoritePromptRemovedEvent } from '../../domain';

@EventsHandler(FavoritePromptRemovedEvent)
export class FavoritePromptRemovedEventHandler
  implements IEventHandler<FavoritePromptRemovedEvent>
{
  private readonly logger = new Logger(FavoritePromptRemovedEventHandler.name);

  handle(event: FavoritePromptRemovedEvent) {
    this.logger.debug(
      `Favorite prompt ${event.id.getValue()} removed for prompt ${event.promptId.getValue()} by user ${event.userId.getValue()}`,
    );
  }
}
