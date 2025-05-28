import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptTagsReplacedEvent } from '../../domain';
import {
  PromptDetailsViewRepository,
  PromptListItemViewRepository,
} from '../ports';
import { PromptDetailsView, PromptListItemView } from '../../views';

@EventsHandler(PromptTagsReplacedEvent)
export class PromptTagsReplacedEventHandler
  implements IEventHandler<PromptTagsReplacedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptTagsReplacedEvent) {
    const { promptId, newTags } = event;
    const promptIdValue = promptId.getValue();
    const tagValues = newTags.map((tag) => tag.getValue());

    try {
      // Update tags in PromptListItemView
      const promptListItem =
        await this.promptListItemViewRepository.findById(promptIdValue);
      if (promptListItem) {
        const updatedPromptListItem = new PromptListItemView(
          promptListItem.id,
          promptListItem.title,
          promptListItem.contentPreview,
          promptListItem.likedCount,
          promptListItem.copiedCount,
          promptListItem.viewCount,
          promptListItem.createdAt,
          promptListItem.isPublic,
          promptListItem.status,
          promptListItem.author,
          tagValues,
        );
        await this.promptListItemViewRepository.save(updatedPromptListItem);
      }

      // Update tags in PromptDetailsView
      const promptDetails =
        await this.promptDetailsViewRepository.findById(promptIdValue);
      if (promptDetails) {
        const updatedPromptDetails = new PromptDetailsView(
          promptDetails.id,
          promptDetails.title,
          promptDetails.content,
          promptDetails.isPublic,
          promptDetails.status,
          promptDetails.createdAt,
          promptDetails.likedCount,
          promptDetails.copiedCount,
          promptDetails.viewCount,
          promptDetails.author,
          tagValues,
        );
        await this.promptDetailsViewRepository.save(updatedPromptDetails);
      }
    } catch (error) {
      console.error(`Error updating tags for prompt ${promptIdValue}:`, error);
    }
  }
}
