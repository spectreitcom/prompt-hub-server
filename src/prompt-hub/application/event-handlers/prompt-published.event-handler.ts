import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  PromptContent,
  PromptId,
  PromptPublishedEvent,
  PromptStatus,
  PromptTimestamps,
  PromptTitle,
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

@EventsHandler(PromptPublishedEvent)
export class PromptPublishedEventHandler
  implements IEventHandler<PromptPublishedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptUserPublicRepository: PromptUserPublicRepository,
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptPublishedEvent) {
    const { authorId, promptId, title, timestamps, content, status } = event;

    const author = await this.promptUserPublicRepository.findById(
      authorId.getValue(),
    );

    if (!author) return;

    await this.updateOrCreateListItemView(
      promptId,
      title,
      content,
      timestamps,
      author,
    );

    await this.updateOrCreateDetailsView(
      promptId,
      title,
      content,
      status,
      timestamps,
      author,
    );
  }

  private async updateOrCreateListItemView(
    promptId: PromptId,
    title: PromptTitle,
    content: PromptContent,
    timestamps: PromptTimestamps,
    author: PromptUserPublicView,
  ) {
    // Prompt List Item View
    const promptListItemView = await this.promptListItemViewRepository.findById(
      promptId.getValue(),
    );

    if (promptListItemView) {
      const promptListItemViewToUpdate = new PromptListItemView(
        promptId.getValue(),
        title.getValue(),
        content.getPreview(),
        promptListItemView.likedCount,
        promptListItemView.copiedCount,
        promptListItemView.viewCount,
        timestamps.getCreatedAt(),
        true, // isPublic
        'PUBLISHED', // status
        author,
        promptListItemView.tags || [],
      );

      await this.promptListItemViewRepository.save(promptListItemViewToUpdate);

      return;
    }

    const promptListItemViewToCreate = new PromptListItemView(
      promptId.getValue(),
      title.getValue(),
      content.getPreview(),
      0,
      0,
      0,
      timestamps.getCreatedAt(),
      true, // isPublic
      'PUBLISHED', // status
      author,
      [], // tags
    );

    await this.promptListItemViewRepository.save(promptListItemViewToCreate);
  }

  private async updateOrCreateDetailsView(
    promptId: PromptId,
    title: PromptTitle,
    content: PromptContent,
    status: PromptStatus,
    timestamps: PromptTimestamps,
    author: PromptUserPublicView,
  ) {
    // Prompt Details View

    const promptDetailsView = await this.promptDetailsViewRepository.findById(
      promptId.getValue(),
    );

    if (promptDetailsView) {
      const promptDetailsViewToUpdate = new PromptDetailsView(
        promptId.getValue(),
        title.getValue(),
        content.getValue(),
        true,
        status.getValue(),
        timestamps.getCreatedAt(),
        promptDetailsView.likedCount,
        promptDetailsView.copiedCount,
        promptDetailsView.viewCount,
        author,
        promptDetailsView.tags || [],
      );

      await this.promptDetailsViewRepository.save(promptDetailsViewToUpdate);

      return;
    }

    const promptDetailsViewToCreate = new PromptDetailsView(
      promptId.getValue(),
      title.getValue(),
      content.getValue(),
      true,
      status.getValue(),
      timestamps.getCreatedAt(),
      0,
      0,
      0,
      author,
      [], // tags
    );

    await this.promptDetailsViewRepository.save(promptDetailsViewToCreate);
  }
}
