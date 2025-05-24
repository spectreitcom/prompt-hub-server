import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteChangedEvent } from '../../../voting/domain';
import {
  PromptDetailsViewRepository,
  PromptListItemViewRepository,
} from '../ports';
import { PromptDetailsView, PromptListItemView } from '../../views';

@EventsHandler(PromptVoteChangedEvent)
export class PromptVoteChangedEventHandler
  implements IEventHandler<PromptVoteChangedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptVoteChangedEvent) {
    const { promptId, oldVoteType, newVoteType } = event;

    await this.updatePromptListItemView(
      promptId.getValue(),
      oldVoteType.isUp(),
      newVoteType.isUp(),
    );
    await this.updatePromptDetailsView(
      promptId.getValue(),
      oldVoteType.isUp(),
      newVoteType.isUp(),
    );
  }

  private async updatePromptListItemView(
    promptId: string,
    wasUpVote: boolean,
    isUpVote: boolean,
  ): Promise<void> {
    const promptListItemView =
      await this.promptListItemViewRepository.findById(promptId);

    if (!promptListItemView) return;

    let updatedLikedCount = promptListItemView.likedCount;

    // If changing from upvote to downvote, decrement the liked count
    if (wasUpVote && !isUpVote) {
      updatedLikedCount -= 1;
    }
    // If changing from downvote to upvote, increment the liked count
    else if (!wasUpVote && isUpVote) {
      updatedLikedCount += 1;
    }

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
    );

    await this.promptListItemViewRepository.save(updatedPromptListItemView);
  }

  private async updatePromptDetailsView(
    promptId: string,
    wasUpVote: boolean,
    isUpVote: boolean,
  ): Promise<void> {
    const promptDetailsView =
      await this.promptDetailsViewRepository.findById(promptId);

    if (!promptDetailsView) return;

    let updatedLikedCount = promptDetailsView.likedCount;

    // If changing from upvote to downvote, decrement the liked count
    if (wasUpVote && !isUpVote) {
      updatedLikedCount -= 1;
    }
    // If changing from downvote to upvote, increment the liked count
    else if (!wasUpVote && isUpVote) {
      updatedLikedCount += 1;
    }

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
    );

    await this.promptDetailsViewRepository.save(updatedPromptDetailsView);
  }
}
