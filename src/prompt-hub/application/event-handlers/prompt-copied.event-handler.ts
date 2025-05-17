import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptCopiedEvent, PromptId } from '../../domain';
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
    const { promptId } = event;

    await this.updatePromptListItemView(promptId);
    await this.updatePromptDetailsView(promptId);
  }

  private async updatePromptListItemView(promptId: PromptId) {
    // prompt list item view
    const promptListItemView = await this.promptListItemViewRepository.findById(
      promptId.getValue(),
    );

    if (!promptListItemView) return;

    const promptListItemViewToUpdate = new PromptListItemView(
      promptListItemView.id,
      promptListItemView.title,
      promptListItemView.contentPreview,
      promptListItemView.likedCount,
      promptListItemView.copiedCount + 1,
      promptListItemView.viewCount,
      promptListItemView.createdAt,
      promptListItemView.author,
    );

    await this.promptListItemViewRepository.save(promptListItemViewToUpdate);
  }

  private async updatePromptDetailsView(promptId: PromptId) {
    // prompt details view
    const promptDetailsView = await this.promptDetailsViewRepository.findById(
      promptId.getValue(),
    );

    if (!promptDetailsView) return;

    const promptDetailsViewToUpdate = new PromptDetailsView(
      promptDetailsView.id,
      promptDetailsView.title,
      promptDetailsView.content,
      promptDetailsView.isPublic,
      promptDetailsView.status,
      promptDetailsView.createdAt,
      promptDetailsView.likedCount,
      promptDetailsView.copiedCount + 1,
      promptDetailsView.viewCount,
      promptDetailsView.author,
    );

    await this.promptDetailsViewRepository.save(promptDetailsViewToUpdate);
  }
}
