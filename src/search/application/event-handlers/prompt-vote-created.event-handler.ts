import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteCreatedEvent } from '../../../voting/domain';

@EventsHandler(PromptVoteCreatedEvent)
export class PromptVoteCreatedEventHandler
  implements IEventHandler<PromptVoteCreatedEvent>
{
  constructor() {}

  async handle(event: PromptVoteCreatedEvent): Promise<void> {
    //...
  }
}
