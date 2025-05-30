import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVisibilityChangedEvent } from '../../domain';
import {
  PromptDetailsViewRepository,
  PromptListItemViewRepository,
} from '../ports';
import { PromptDetailsView, PromptListItemView } from '../../views';

@EventsHandler(PromptVisibilityChangedEvent)
export class PromptVisibilityChangedEventHandler
  implements IEventHandler<PromptVisibilityChangedEvent>
{
  constructor(
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
  ) {}

  async handle(event: PromptVisibilityChangedEvent) {
    const { promptId, visibility } = event;
    const promptIdValue = promptId.getValue();
    const isPublic = visibility.isPublic();

    await this.updatePromptDetailsView(promptIdValue, isPublic);
    await this.updatePromptListItemView(promptIdValue, isPublic);
  }

  private async updatePromptDetailsView(
    promptId: string,
    isPublic: boolean,
  ): Promise<void> {
    const promptDetailsView =
      await this.promptDetailsViewRepository.findById(promptId);
    if (!promptDetailsView) return;

    const promptDetailsViewToUpdate = new PromptDetailsView(
      promptDetailsView.id,
      promptDetailsView.title,
      promptDetailsView.content,
      isPublic,
      promptDetailsView.status,
      promptDetailsView.createdAt,
      promptDetailsView.likedCount,
      promptDetailsView.copiedCount,
      promptDetailsView.viewCount,
      promptDetailsView.author,
      promptDetailsView.tags ?? [],
      promptDetailsView.instruction,
    );

    await this.promptDetailsViewRepository.save(promptDetailsViewToUpdate);
  }

  private async updatePromptListItemView(
    promptId: string,
    isPublic: boolean,
  ): Promise<void> {
    const promptListItemView =
      await this.promptListItemViewRepository.findById(promptId);
    if (!promptListItemView) return;

    const promptListItemViewToUpdate = new PromptListItemView(
      promptListItemView.id,
      promptListItemView.title,
      promptListItemView.contentPreview,
      promptListItemView.likedCount,
      promptListItemView.copiedCount,
      promptListItemView.viewCount,
      promptListItemView.createdAt,
      isPublic,
      promptListItemView.status,
      promptListItemView.author,
      promptListItemView.tags ?? [],
    );

    await this.promptListItemViewRepository.save(promptListItemViewToUpdate);
  }
}
