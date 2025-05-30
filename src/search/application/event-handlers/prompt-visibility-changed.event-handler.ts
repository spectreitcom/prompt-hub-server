import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVisibilityChangedEvent } from '../../../prompt-hub/domain';
import { SearchPromptEntryViewRepository } from '../ports';
import { SearchPromptEntryView } from '../../views';

@EventsHandler(PromptVisibilityChangedEvent)
export class PromptVisibilityChangedEventHandler
  implements IEventHandler<PromptVisibilityChangedEvent>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
  ) {}

  // todo;
  async handle(event: PromptVisibilityChangedEvent) {
    const { promptId, visibility } = event;

    // Find the existing entry
    const existingEntry = await this.searchPromptEntryViewRepository.findById(
      promptId.getValue(),
    );

    if (!existingEntry) {
      return;
    }

    // Create an updated entry with the new visibility
    const updatedSearchPromptEntryView = new SearchPromptEntryView(
      existingEntry.id,
      existingEntry.title,
      existingEntry.content,
      existingEntry.author,
      visibility.isPublic(), // Update the visibility
      existingEntry.status,
      existingEntry.copiedCount,
      existingEntry.viewCount,
      existingEntry.likedCount,
      existingEntry.createdAt,
      existingEntry.updatedAt,
      existingEntry.tags,
    );

    // Save the updated entry
    await this.searchPromptEntryViewRepository.save(
      updatedSearchPromptEntryView,
    );
  }
}
