import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVisibilityChangedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(PromptVisibilityChangedEvent)
export class PromptVisibilityChangedEventHandler
  implements IEventHandler<PromptVisibilityChangedEvent>
{
  private readonly logger = new Logger(PromptVisibilityChangedEventHandler.name);

  handle(event: PromptVisibilityChangedEvent) {
    this.logger.debug(
      `Prompt ${event.promptId.getValue()} visibility changed to ${event.visibility.value}`,
    );
  }
}