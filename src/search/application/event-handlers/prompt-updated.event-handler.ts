import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptUpdatedEvent } from '../../../prompt-hub/domain';
import {
  SearchPromptEntryViewRepository,
  UserSearchViewRepository,
} from '../ports';
import { SearchPromptEntryView } from '../../views';

@EventsHandler(PromptUpdatedEvent)
export class PromptUpdatedEventHandler
  implements IEventHandler<PromptUpdatedEvent>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
    private readonly userSearchViewRepository: UserSearchViewRepository,
  ) {}

  async handle(event: PromptUpdatedEvent) {
    const { promptId, content, authorId, title, timestamps } = event;

    // Find the existing entry
    const existingEntry = await this.searchPromptEntryViewRepository.findById(
      promptId.getValue(),
    );

    if (!existingEntry) {
      return;
    }

    // Get the author information
    const author = await this.userSearchViewRepository.findById(
      authorId.getValue(),
    );

    if (!author) {
      return;
    }

    // Create an updated entry with the new information
    const updatedSearchPromptEntryView = new SearchPromptEntryView(
      promptId.getValue(),
      title.getValue(),
      content.getValue(),
      author,
      existingEntry.isPublic,
      existingEntry.status,
      existingEntry.copiedCount,
      existingEntry.viewCount,
      existingEntry.likedCount,
      existingEntry.createdAt,
      timestamps.getUpdatedAt(),
      existingEntry.tags,
    );

    // Save the updated entry
    await this.searchPromptEntryViewRepository.save(
      updatedSearchPromptEntryView,
    );
  }
}
