import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptCopiedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(PromptCopiedEvent)
export class PromptCopiedEventHandler
  implements IEventHandler<PromptCopiedEvent>
{
  private readonly logger = new Logger(PromptCopiedEventHandler.name);

  handle(event: PromptCopiedEvent) {
    this.logger.debug(
      `Prompt ${event.promptId.getValue()} was copied by user ${event.byUserId.getValue()}`,
    );
  }
}
