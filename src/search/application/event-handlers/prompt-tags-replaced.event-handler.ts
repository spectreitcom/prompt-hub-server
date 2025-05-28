import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptTagsReplacedEvent } from '../../../prompt-hub/domain';
import { SearchPromptEntryViewRepository } from '../ports';
import { SearchPromptEntryView } from '../../views';

@EventsHandler(PromptTagsReplacedEvent)
export class PromptTagsReplacedEventHandler
  implements IEventHandler<PromptTagsReplacedEvent>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
  ) {}

  async handle(event: PromptTagsReplacedEvent) {
    const { promptId, newTags } = event;
    const promptIdValue = promptId.getValue();
    const tagValues = newTags.map((tag) => tag.getValue());

    try {
      // Find the search prompt entry
      const searchPromptEntry =
        await this.searchPromptEntryViewRepository.findById(promptIdValue);

      // If the entry exists, update its tags
      if (searchPromptEntry) {
        const updatedSearchPromptEntry = new SearchPromptEntryView(
          searchPromptEntry.id,
          searchPromptEntry.title,
          searchPromptEntry.content,
          searchPromptEntry.author,
          searchPromptEntry.isPublic,
          searchPromptEntry.status,
          searchPromptEntry.copiedCount,
          searchPromptEntry.viewCount,
          searchPromptEntry.likedCount,
          searchPromptEntry.createdAt,
          searchPromptEntry.updatedAt,
          tagValues,
        );

        await this.searchPromptEntryViewRepository.save(
          updatedSearchPromptEntry,
        );
      }
    } catch (error) {
      console.error(
        `Error updating tags for search prompt entry ${promptIdValue}:`,
        error,
      );
    }
  }
}
