import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptCopiedEvent } from '../../../prompt-hub/domain';

@EventsHandler(PromptCopiedEvent)
export class PromptCopiedEventHandler
  implements IEventHandler<PromptCopiedEvent>
{
  constructor() {}

  async handle(event: PromptCopiedEvent) {
    //....
  }
}
