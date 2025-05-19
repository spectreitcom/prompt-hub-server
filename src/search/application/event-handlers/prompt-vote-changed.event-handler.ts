import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteChangedEvent } from '../../../voting/domain';

@EventsHandler(PromptVoteChangedEvent)
export class PromptVoteChangedEventHandler
  implements IEventHandler<PromptVoteChangedEvent>
{
  constructor() {}

  async handle(event: PromptVoteChangedEvent): Promise<void> {
    //...
  }
}
