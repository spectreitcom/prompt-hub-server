import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteCreatedEvent } from '../../../voting/domain';
import { SearchPromptEntryViewRepository } from '../ports';
import { SearchPromptEntryView } from '../../views';

@EventsHandler(PromptVoteCreatedEvent)
export class PromptVoteCreatedEventHandler
  implements IEventHandler<PromptVoteCreatedEvent>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
  ) {}

  async handle(event: PromptVoteCreatedEvent): Promise<void> {
    const { promptId, voteType } = event;

    // Find the existing entry
    const existingEntry = await this.searchPromptEntryViewRepository.findById(
      promptId.getValue(),
    );

    if (!existingEntry) {
      return;
    }

    // Only update likedCount if the vote is UP
    if (voteType.isUp()) {
      // Create an updated entry with incremented likedCount
      const updatedSearchPromptEntryView = new SearchPromptEntryView(
        existingEntry.id,
        existingEntry.title,
        existingEntry.content,
        existingEntry.author,
        existingEntry.isPublic,
        existingEntry.status,
        existingEntry.copiedCount,
        existingEntry.viewCount,
        existingEntry.likedCount + 1, // Increment likedCount
        existingEntry.createdAt,
        existingEntry.updatedAt,
      );

      // Save the updated entry
      await this.searchPromptEntryViewRepository.save(
        updatedSearchPromptEntryView,
      );
    }
  }
}
