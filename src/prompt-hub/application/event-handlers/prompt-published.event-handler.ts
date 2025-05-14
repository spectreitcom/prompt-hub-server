import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptPublishedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(PromptPublishedEvent)
export class PromptPublishedEventHandler
  implements IEventHandler<PromptPublishedEvent>
{
  private readonly logger = new Logger(PromptPublishedEventHandler.name);

  handle(event: PromptPublishedEvent) {
    this.logger.debug(`Prompt ${event.promptId.getValue()} was published`);
  }
}
