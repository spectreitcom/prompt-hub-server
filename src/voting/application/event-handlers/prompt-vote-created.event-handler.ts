import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PromptVoteCreatedEvent } from '../../domain';

@EventsHandler(PromptVoteCreatedEvent)
export class PromptVoteCreatedEventHandler
  implements IEventHandler<PromptVoteCreatedEvent>
{
  private readonly logger = new Logger(PromptVoteCreatedEventHandler.name);

  handle(event: PromptVoteCreatedEvent) {
    this.logger.debug(
      `Vote ${event.voteId.getValue()} created for prompt ${event.promptId.getValue()} by user ${event.userId.getValue()} with type ${event.voteType.getValue()}`,
    );
  }
}
