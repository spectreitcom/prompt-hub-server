import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptViewedEvent } from '../../../prompt-hub/domain';

@EventsHandler(PromptViewedEvent)
export class PromptViewedEventHandler
  implements IEventHandler<PromptViewedEvent>
{
  constructor() {}

  async handle(event: PromptViewedEvent) {
    // todo;
  }
}
