import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptUpdatedEvent } from '../../../prompt-hub/domain';

@EventsHandler(PromptUpdatedEvent)
export class PromptUpdatedEventHandler
  implements IEventHandler<PromptUpdatedEvent>
{
  constructor() {}

  async handle(event: PromptUpdatedEvent) {
    const { promptId, content, authorId, title, timestamps } = event;
    //...
  }
}
