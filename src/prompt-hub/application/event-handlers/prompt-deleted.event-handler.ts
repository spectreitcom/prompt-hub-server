import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptDeletedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(PromptDeletedEvent)
export class PromptDeletedEventHandler
  implements IEventHandler<PromptDeletedEvent>
{
  private readonly logger = new Logger(PromptDeletedEventHandler.name);

  handle(event: PromptDeletedEvent) {
    this.logger.debug(`Prompt ${event.promptId.getValue()} was deleted`);
  }
}
