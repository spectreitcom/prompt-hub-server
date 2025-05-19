import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteChangedEvent } from '../../../voting/domain';
import { SearchPromptEntryViewRepository } from '../ports';
import { SearchPromptEntryView } from '../../views';

@EventsHandler(PromptVoteChangedEvent)
export class PromptVoteChangedEventHandler
  implements IEventHandler<PromptVoteChangedEvent>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
  ) {}

  async handle(event: PromptVoteChangedEvent): Promise<void> {
    const { promptId, oldVoteType, newVoteType } = event;

    // Find the existing entry
    const existingEntry = await this.searchPromptEntryViewRepository.findById(
      promptId.getValue(),
    );

    if (!existingEntry) {
      return;
    }

    // Calculate the change in likedCount based on vote type change
    let likedCountChange = 0;

    // If old vote was DOWN and new vote is UP, increment likedCount
    if (oldVoteType.isDown() && newVoteType.isUp()) {
      likedCountChange = 1;
    }
    // If old vote was UP and new vote is DOWN, decrement likedCount
    else if (oldVoteType.isUp() && newVoteType.isDown()) {
      likedCountChange = -1;
    }

    // Only update if there's a change in likedCount
    if (likedCountChange !== 0) {
      // Create an updated entry with adjusted likedCount
      const updatedSearchPromptEntryView = new SearchPromptEntryView(
        existingEntry.id,
        existingEntry.title,
        existingEntry.content,
        existingEntry.author,
        existingEntry.isPublic,
        existingEntry.status,
        existingEntry.copiedCount,
        existingEntry.viewCount,
        existingEntry.likedCount + likedCountChange, // Adjust likedCount
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
