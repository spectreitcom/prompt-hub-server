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
    const { promptId, byUserId } = event;

    // Find the existing entry
    const existingEntry = await this.searchPromptEntryViewRepository.findById(
      promptId.getValue(),
    );

    if (!existingEntry) {
      return;
    }

    // If byUserId is not provided, assume the viewer is not the owner
    // Otherwise, check if the viewer is the owner of the prompt
    const isOwner = byUserId
      ? existingEntry.author.id === byUserId.getValue()
      : false;

    // Only increment the view count if the viewer is not the owner
    const newViewCount = isOwner
      ? existingEntry.viewCount
      : existingEntry.viewCount + 1;

    // Create a new entry with potentially incremented viewCount
    const updatedEntry = new SearchPromptEntryView(
      existingEntry.id,
      existingEntry.title,
      existingEntry.content,
      existingEntry.author,
      existingEntry.isPublic,
      existingEntry.status,
      existingEntry.copiedCount,
      newViewCount,
      existingEntry.likedCount,
      existingEntry.createdAt,
      existingEntry.updatedAt,
    );

    // Save the updated entry
    await this.searchPromptEntryViewRepository.save(updatedEntry);
  }
}
