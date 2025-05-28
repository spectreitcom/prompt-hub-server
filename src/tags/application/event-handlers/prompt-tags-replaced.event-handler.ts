import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptTagsReplacedEvent } from '../../../prompt-hub/domain';

@EventsHandler(PromptTagsReplacedEvent)
export class PromptTagsReplacedEventHandler
  implements IEventHandler<PromptTagsReplacedEvent>
{
  constructor() {}

  async handle(event: PromptTagsReplacedEvent) {
    //...
  }
}
