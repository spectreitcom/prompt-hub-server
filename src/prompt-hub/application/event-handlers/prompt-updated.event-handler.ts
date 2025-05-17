import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptUpdatedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(PromptUpdatedEvent)
export class PromptUpdatedEventHandler
  implements IEventHandler<PromptUpdatedEvent>
{
  private readonly logger = new Logger(PromptUpdatedEventHandler.name);

  handle(event: PromptUpdatedEvent) {
    this.logger.debug(`Prompt ${event.promptId.getValue()} was updated`);
  }
}
