import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PromptVoteChangedEvent } from '../../domain';

@EventsHandler(PromptVoteChangedEvent)
export class PromptVoteChangedEventHandler
  implements IEventHandler<PromptVoteChangedEvent>
{
  private readonly logger = new Logger(PromptVoteChangedEventHandler.name);

  handle(event: PromptVoteChangedEvent) {
    this.logger.debug(
      `Vote ${event.voteId.getValue()} for prompt ${event.promptId.getValue()} by user ${event.userId.getValue()} changed from ${event.oldVoteType.getValue()} to ${event.newVoteType.getValue()}`,
    );
  }
}
