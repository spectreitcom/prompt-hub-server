import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVisibilityChangedEvent } from '../../domain';
import { PromptDetailsViewRepository } from '../ports';
import { PromptDetailsView } from '../../views';

@EventsHandler(PromptVisibilityChangedEvent)
export class PromptVisibilityChangedEventHandler
  implements IEventHandler<PromptVisibilityChangedEvent>
{
  constructor(
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptVisibilityChangedEvent) {
    const { promptId, visibility } = event;

    const promptDetailsView = await this.promptDetailsViewRepository.findById(
      promptId.getValue(),
    );

    if (!promptDetailsView) return;

    const promptDetailsViewToUpdate = new PromptDetailsView(
      promptDetailsView.id,
      promptDetailsView.title,
      promptDetailsView.content,
      visibility.isPublic(),
      promptDetailsView.status,
      promptDetailsView.createdAt,
      promptDetailsView.likedCount,
      promptDetailsView.copiedCount,
      promptDetailsView.viewCount,
      promptDetailsView.author,
    );

    await this.promptDetailsViewRepository.save(promptDetailsViewToUpdate);
  }
}
