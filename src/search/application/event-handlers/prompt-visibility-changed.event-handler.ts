import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVisibilityChangedEvent } from '../../../prompt-hub/domain';

@EventsHandler(PromptVisibilityChangedEvent)
export class PromptVisibilityChangedEventHandler
  implements IEventHandler<PromptVisibilityChangedEvent>
{
  constructor() {}

  async handle(event: PromptVisibilityChangedEvent) {
    const { promptId, visibility } = event;
  }
}
