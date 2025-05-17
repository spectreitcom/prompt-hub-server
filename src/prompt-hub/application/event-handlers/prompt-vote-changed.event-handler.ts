import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteChangedEvent } from '../../../voting/domain';

@EventsHandler(PromptVoteChangedEvent)
export class PromptVoteChangedEventHandler
  implements IEventHandler<PromptVoteChangedEvent>
{
  handle(event: PromptVoteChangedEvent) {
    //
  }
}
