import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptCopiedEvent, PromptId, UserId } from '../../domain';
import {
  PromptDetailsViewRepository,
  PromptListItemViewRepository,
} from '../ports';
import { PromptDetailsView, PromptListItemView } from '../../views';

@EventsHandler(PromptCopiedEvent)
export class PromptCopiedEventHandler
  implements IEventHandler<PromptCopiedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptCopiedEvent) {
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

    // Always increment copiedCount if byUserId is not provided
    // Don't increment copiedCount if the prompt is copied by its owner
    const isOwner = byUserId ? promptListItemView.author.id === byUserId.getValue() : false;
    const newCopiedCount = isOwner
      ? promptListItemView.copiedCount
      : promptListItemView.copiedCount + 1;

    const promptListItemViewToUpdate = new PromptListItemView(
      promptListItemView.id,
      promptListItemView.title,
      promptListItemView.contentPreview,
      promptListItemView.likedCount,
      newCopiedCount,
      promptListItemView.viewCount,
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

    // Always increment copiedCount if byUserId is not provided
    // Don't increment copiedCount if the prompt is copied by its owner
    const isOwner = byUserId ? promptDetailsView.author.id === byUserId.getValue() : false;
    const newCopiedCount = isOwner
      ? promptDetailsView.copiedCount
      : promptDetailsView.copiedCount + 1;

    const promptDetailsViewToUpdate = new PromptDetailsView(
      promptDetailsView.id,
      promptDetailsView.title,
      promptDetailsView.content,
      promptDetailsView.isPublic,
      promptDetailsView.status,
      promptDetailsView.createdAt,
      promptDetailsView.likedCount,
      newCopiedCount,
      promptDetailsView.viewCount,
      promptDetailsView.author,
    );

    await this.promptDetailsViewRepository.save(promptDetailsViewToUpdate);
  }
}
