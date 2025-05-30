import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptPublishedEvent } from '../../../prompt-hub/domain';
import {
  SearchPromptEntryViewRepository,
  UserSearchViewRepository,
} from '../ports';
import { SearchPromptEntryView } from '../../views';

@EventsHandler(PromptPublishedEvent)
export class PromptPublishedEventHandler
  implements IEventHandler<PromptPublishedEvent>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
    private readonly userSearchViewRepository: UserSearchViewRepository,
  ) {}

  async handle(event: PromptPublishedEvent) {
    const { promptId, authorId, title, content, timestamps, status, tags } =
      event;

    // Get the author information
    const author = await this.userSearchViewRepository.findById(
      authorId.getValue(),
    );

    if (!author) {
      return;
    }

    // Check if the entry already exists
    const existingEntry = await this.searchPromptEntryViewRepository.findById(
      promptId.getValue(),
    );

    // Create a new entry or update the existing one
    const searchPromptEntryView = new SearchPromptEntryView(
      promptId.getValue(),
      title.getValue(),
      content.getValue(),
      author,
      true, // Published prompts are public
      status.getValue(),
      existingEntry ? existingEntry.copiedCount : 0,
      existingEntry ? existingEntry.viewCount : 0,
      existingEntry ? existingEntry.likedCount : 0,
      timestamps.getCreatedAt(),
      timestamps.getUpdatedAt(),
      tags.map((tag) => tag.getValue()),
    );

    await this.searchPromptEntryViewRepository.save(searchPromptEntryView);
  }
}
