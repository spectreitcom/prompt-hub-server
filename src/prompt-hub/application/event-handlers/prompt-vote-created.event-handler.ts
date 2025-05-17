import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PromptVoteCreatedEvent } from '../../../voting/domain';

@EventsHandler(PromptVoteCreatedEvent)
export class PromptVoteCreatedEventHandler
  implements IEventHandler<PromptVoteCreatedEvent>
{
  private readonly logger = new Logger(PromptVoteCreatedEventHandler.name);

  async handle(event: PromptVoteCreatedEvent) {
    const { promptId, voteType } = event;
  }
}
