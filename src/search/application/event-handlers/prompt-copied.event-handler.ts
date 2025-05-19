import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptCopiedEvent } from '../../../prompt-hub/domain';
import { SearchPromptEntryViewRepository } from '../ports';

@EventsHandler(PromptCopiedEvent)
export class PromptCopiedEventHandler
  implements IEventHandler<PromptCopiedEvent>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
  ) {}

  async handle(event: PromptCopiedEvent) {
    //....
  }
}
