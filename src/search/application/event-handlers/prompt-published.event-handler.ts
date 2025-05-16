import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptPublishedEvent } from '../../../prompt-hub/domain';

@EventsHandler(PromptPublishedEvent)
export class PromptPublishedEventHandler
  implements IEventHandler<PromptPublishedEvent>
{
  handle(event: PromptPublishedEvent) {
    // todo: should update status or create a new record
  }
}
