import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptViewedEvent, PromptId, UserId } from '../../domain';
import {
  PromptDetailsViewRepository,
  PromptListItemViewRepository,
} from '../ports';
import { PromptDetailsView, PromptListItemView } from '../../views';

@EventsHandler(PromptViewedEvent)
export class PromptViewedEventHandler
  implements IEventHandler<PromptViewedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptViewedEvent) {
    const { promptId, byUserId } = event;

    await this.updatePromptListItemView(promptId, byUserId);
    await this.updatePromptDetailsView(promptId, byUserId);
  }

  private async updatePromptListItemView(promptId: PromptId, byUserId?: UserId) {
    // prompt list item view
    const promptListItemView = await this.promptListItemViewRepository.findById(
      promptId.getValue(),
    );

    if (!promptListItemView) return;

    // If byUserId is not provided, assume the viewer is not the owner
    // Otherwise, check if the prompt is viewed by its owner
    const isOwner = byUserId ? promptListItemView.author.id === byUserId.getValue() : false;
    const newViewCount = isOwner
      ? promptListItemView.viewCount
      : promptListItemView.viewCount + 1;

    const promptListItemViewToUpdate = new PromptListItemView(
      promptListItemView.id,
      promptListItemView.title,
      promptListItemView.contentPreview,
      promptListItemView.likedCount,
      promptListItemView.copiedCount,
      newViewCount,
      promptListItemView.createdAt,
      promptListItemView.isPublic,
      promptListItemView.status,
      promptListItemView.author,
    );

    await this.promptListItemViewRepository.save(promptListItemViewToUpdate);
  }

  private async updatePromptDetailsView(promptId: PromptId, byUserId?: UserId) {
    // prompt details view
    const promptDetailsView = await this.promptDetailsViewRepository.findById(
      promptId.getValue(),
    );

    if (!promptDetailsView) return;

    // If byUserId is not provided, assume the viewer is not the owner
    // Otherwise, check if the prompt is viewed by its owner
    const isOwner = byUserId ? promptDetailsView.author.id === byUserId.getValue() : false;
    const newViewCount = isOwner
      ? promptDetailsView.viewCount
      : promptDetailsView.viewCount + 1;

    const promptDetailsViewToUpdate = new PromptDetailsView(
      promptDetailsView.id,
      promptDetailsView.title,
      promptDetailsView.content,
      promptDetailsView.isPublic,
      promptDetailsView.status,
      promptDetailsView.createdAt,
      promptDetailsView.likedCount,
      promptDetailsView.copiedCount,
      newViewCount,
      promptDetailsView.author,
    );

    await this.promptDetailsViewRepository.save(promptDetailsViewToUpdate);
  }
}
