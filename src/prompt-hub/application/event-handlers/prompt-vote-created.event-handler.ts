import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteCreatedEvent } from '../../../voting';
import {
  PromptDetailsViewRepository,
  PromptListItemViewRepository,
} from '../ports';
import { PromptDetailsView, PromptListItemView } from '../../views';

@EventsHandler(PromptVoteCreatedEvent)
export class PromptVoteCreatedEventHandler
  implements IEventHandler<PromptVoteCreatedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptVoteCreatedEvent) {
    const { promptId, voteType } = event;

    await this.updatePromptListItemView(promptId.getValue(), voteType.isUp());
    await this.updatePromptDetailsView(promptId.getValue(), voteType.isUp());
  }

  private async updatePromptListItemView(
    promptId: string,
    isUpVote: boolean,
  ): Promise<void> {
    const promptListItemView =
      await this.promptListItemViewRepository.findById(promptId);

    if (!promptListItemView) return;

    const updatedLikedCount = isUpVote
      ? promptListItemView.likedCount + 1
      : promptListItemView.likedCount;

    const updatedPromptListItemView = new PromptListItemView(
      promptListItemView.id,
      promptListItemView.title,
      promptListItemView.contentPreview,
      updatedLikedCount,
      promptListItemView.copiedCount,
      promptListItemView.viewCount,
      promptListItemView.createdAt,
      promptListItemView.isPublic,
      promptListItemView.status,
      promptListItemView.author,
      promptListItemView.tags || [],
    );

    await this.promptListItemViewRepository.save(updatedPromptListItemView);
  }

  private async updatePromptDetailsView(
    promptId: string,
    isUpVote: boolean,
  ): Promise<void> {
    const promptDetailsView =
      await this.promptDetailsViewRepository.findById(promptId);

    if (!promptDetailsView) return;

    const updatedLikedCount = isUpVote
      ? promptDetailsView.likedCount + 1
      : promptDetailsView.likedCount;

    const updatedPromptDetailsView = new PromptDetailsView(
      promptDetailsView.id,
      promptDetailsView.title,
      promptDetailsView.content,
      promptDetailsView.isPublic,
      promptDetailsView.status,
      promptDetailsView.createdAt,
      updatedLikedCount,
      promptDetailsView.copiedCount,
      promptDetailsView.viewCount,
      promptDetailsView.author,
      promptDetailsView.tags || [],
    );

    await this.promptDetailsViewRepository.save(updatedPromptDetailsView);
  }
}
