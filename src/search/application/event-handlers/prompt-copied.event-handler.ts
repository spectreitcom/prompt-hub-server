import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptCopiedEvent } from '../../../prompt-hub/domain';
import { SearchPromptEntryViewRepository } from '../ports';
import { SearchPromptEntryView } from '../../views';

@EventsHandler(PromptCopiedEvent)
export class PromptCopiedEventHandler
  implements IEventHandler<PromptCopiedEvent>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
  ) {}

  async handle(event: PromptCopiedEvent) {
    const { promptId, byUserId } = event;

    const searchPromptEntryView =
      await this.searchPromptEntryViewRepository.findById(promptId.getValue());

    if (!searchPromptEntryView) return;

    // Always increment copiedCount if byUserId is not provided
    // Don't increment copiedCount if the prompt is copied by its owner
    const isOwner = byUserId
      ? searchPromptEntryView.author.id === byUserId.getValue()
      : false;
    const newCopiedCount = isOwner
      ? searchPromptEntryView.copiedCount
      : searchPromptEntryView.copiedCount + 1;

    const updatedSearchPromptEntryView = new SearchPromptEntryView(
      searchPromptEntryView.id,
      searchPromptEntryView.title,
      searchPromptEntryView.content,
      searchPromptEntryView.author,
      searchPromptEntryView.isPublic,
      searchPromptEntryView.status,
      newCopiedCount,
      searchPromptEntryView.viewCount,
      searchPromptEntryView.likedCount,
      searchPromptEntryView.createdAt,
      searchPromptEntryView.updatedAt,
      searchPromptEntryView.tags,
    );

    await this.searchPromptEntryViewRepository.save(
      updatedSearchPromptEntryView,
    );
  }
}
