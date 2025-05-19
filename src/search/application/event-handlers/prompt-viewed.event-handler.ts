import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptViewedEvent } from '../../../prompt-hub/domain';
import { SearchPromptEntryViewRepository } from '../ports';
import { SearchPromptEntryView } from '../../views';

@EventsHandler(PromptViewedEvent)
export class PromptViewedEventHandler
  implements IEventHandler<PromptViewedEvent>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
  ) {}

  async handle(event: PromptViewedEvent) {
    const { promptId } = event;

    // Find the existing entry
    const existingEntry = await this.searchPromptEntryViewRepository.findById(
      promptId.getValue(),
    );

    if (!existingEntry) {
      return;
    }

    // Create a new entry with incremented viewCount
    const updatedEntry = new SearchPromptEntryView(
      existingEntry.id,
      existingEntry.title,
      existingEntry.content,
      existingEntry.author,
      existingEntry.isPublic,
      existingEntry.status,
      existingEntry.copiedCount,
      existingEntry.viewCount + 1,
      existingEntry.likedCount,
      existingEntry.createdAt,
      existingEntry.updatedAt,
    );

    // Save the updated entry
    await this.searchPromptEntryViewRepository.save(updatedEntry);
  }
}
