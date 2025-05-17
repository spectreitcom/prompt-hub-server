import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptUpdatedEvent } from '../../domain';

@EventsHandler(PromptUpdatedEvent)
export class PromptUpdatedEventHandler
  implements IEventHandler<PromptUpdatedEvent>
{
  async handle(event: PromptUpdatedEvent) {
    const { promptId, content, authorId, title, timestamps } = event;
    /// todo;
  }
}
