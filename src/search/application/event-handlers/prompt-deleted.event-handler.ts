import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptDeletedEvent } from '../../../prompt-hub/domain';
import { SearchPromptEntryViewRepository } from '../ports';

@EventsHandler(PromptDeletedEvent)
export class PromptDeletedEventHandler
  implements IEventHandler<PromptDeletedEvent>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
  ) {}

  async handle(event: PromptDeletedEvent) {
    const { promptId } = event;

    const searchPromptEntry = await this.searchPromptEntryViewRepository.findById(promptId.getValue());

    if (!searchPromptEntry) {
      return;
    }

    await this.searchPromptEntryViewRepository.delete(promptId.getValue());
  }
}
