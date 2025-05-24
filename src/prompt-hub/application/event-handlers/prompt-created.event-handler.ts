import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  PromptContent,
  PromptCreatedEvent,
  PromptId,
  PromptStatus,
  PromptTimestamps,
  PromptTitle,
  PromptVisibility,
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

@EventsHandler(PromptCreatedEvent)
export class PromptCreatedEventHandler
  implements IEventHandler<PromptCreatedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptUserPublicRepository: PromptUserPublicRepository,
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptCreatedEvent) {
    const {
      promptId,
      content,
      authorId,
      title,
      timestamps,
      status,
      visibility,
    } = event;

    const author = await this.promptUserPublicRepository.findById(
      authorId.getValue(),
    );

    if (!author) return;

    await this.createPromptListItemView(
      promptId,
      title,
      content,
      timestamps,
      status,
      visibility,
      author,
    );

    await this.createPromptDetailsView(
      promptId,
      title,
      content,
      timestamps,
      status,
      visibility,
      author,
    );
  }

  private async createPromptListItemView(
    promptId: PromptId,
    title: PromptTitle,
    content: PromptContent,
    timestamps: PromptTimestamps,
    status: PromptStatus,
    visibility: PromptVisibility,
    author: PromptUserPublicView,
  ) {
    const promptListItemView = new PromptListItemView(
      promptId.getValue(),
      title.getValue(),
      content.getPreview(),
      0, // likedCount
      0, // copiedCount
      0, // viewCount
      timestamps.getCreatedAt(),
      visibility.isPublic(),
      status.getValue(),
      author,
    );

    await this.promptListItemViewRepository.save(promptListItemView);
  }

  private async createPromptDetailsView(
    promptId: PromptId,
    title: PromptTitle,
    content: PromptContent,
    timestamps: PromptTimestamps,
    status: PromptStatus,
    visibility: PromptVisibility,
    author: PromptUserPublicView,
  ) {
    const promptDetailsView = new PromptDetailsView(
      promptId.getValue(),
      title.getValue(),
      content.getValue(),
      visibility.isPublic(),
      status.getValue(),
      timestamps.getCreatedAt(),
      0, // likedCount
      0, // copiedCount
      0, // viewCount
      author,
    );

    await this.promptDetailsViewRepository.save(promptDetailsView);
  }
}
