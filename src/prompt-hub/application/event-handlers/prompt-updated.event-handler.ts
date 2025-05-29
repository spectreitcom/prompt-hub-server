import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  PromptContent,
  PromptId,
  PromptInstruction,
  PromptTimestamps,
  PromptTitle,
  PromptUpdatedEvent,
} from '../../domain';
import {
  PromptDetailsViewRepository,
  PromptListItemViewRepository,
  PromptUserPublicRepository,
} from '../ports';
import {
  PromptDetailsView,
  PromptListItemView,
  PromptUserPublicView,
} from '../../views';

@EventsHandler(PromptUpdatedEvent)
export class PromptUpdatedEventHandler
  implements IEventHandler<PromptUpdatedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptUserPublicRepository: PromptUserPublicRepository,
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptUpdatedEvent) {
    const { promptId, content, authorId, title, timestamps, instruction } =
      event;

    const author = await this.promptUserPublicRepository.findById(
      authorId.getValue(),
    );

    if (!author) return;

    await this.updatePromptListItemView(
      promptId,
      title,
      content,
      timestamps,
      author,
    );
    await this.updatePromptDetailsView(
      promptId,
      title,
      content,
      timestamps,
      author,
      instruction,
    );
  }

  private async updatePromptListItemView(
    promptId: PromptId,
    title: PromptTitle,
    content: PromptContent,
    timestamps: PromptTimestamps,
    author: PromptUserPublicView,
  ) {
    const promptListItemView = await this.promptListItemViewRepository.findById(
      promptId.getValue(),
    );

    if (!promptListItemView) return;

    const promptListItemViewToUpdate = new PromptListItemView(
      promptId.getValue(),
      title.getValue(),
      content.getPreview(),
      promptListItemView.likedCount,
      promptListItemView.copiedCount,
      promptListItemView.viewCount,
      timestamps.getCreatedAt(),
      promptListItemView.isPublic,
      promptListItemView.status,
      author,
      promptListItemView.tags || [],
    );

    await this.promptListItemViewRepository.save(promptListItemViewToUpdate);
  }

  private async updatePromptDetailsView(
    promptId: PromptId,
    title: PromptTitle,
    content: PromptContent,
    timestamps: PromptTimestamps,
    author: PromptUserPublicView,
    instruction: PromptInstruction,
  ) {
    const promptDetailsView = await this.promptDetailsViewRepository.findById(
      promptId.getValue(),
    );

    if (!promptDetailsView) return;

    const promptDetailsViewToUpdate = new PromptDetailsView(
      promptId.getValue(),
      title.getValue(),
      content.getValue(),
      promptDetailsView.isPublic,
      promptDetailsView.status,
      timestamps.getCreatedAt(),
      promptDetailsView.likedCount,
      promptDetailsView.copiedCount,
      promptDetailsView.viewCount,
      author,
      promptDetailsView.tags || [],
      instruction.getValue(),
    );

    await this.promptDetailsViewRepository.save(promptDetailsViewToUpdate);
  }
}
