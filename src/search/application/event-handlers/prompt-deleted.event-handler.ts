import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptDeletedEvent } from '../../../prompt-hub/domain';

@EventsHandler(PromptDeletedEvent)
export class PromptDeletedEventHandler
  implements IEventHandler<PromptDeletedEvent>
{
  constructor() {}

  async handle(event: PromptDeletedEvent) {
    const { promptId } = event;
  }
}
