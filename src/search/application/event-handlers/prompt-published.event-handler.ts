import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptPublishedEvent } from '../../../prompt-hub/domain';

@EventsHandler(PromptPublishedEvent)
export class PromptPublishedEventHandler
  implements IEventHandler<PromptPublishedEvent>
{
  handle(event: PromptPublishedEvent) {
    const { promptId } = event;
    // todo: should update status or create a new record
  }
}
