import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptPublishedEvent } from '../../domain';
import {
  PromptListItemViewRepository,
  PromptUserPublicRepository,
} from '../ports';
import { PromptListItemView } from '../../views';

@EventsHandler(PromptPublishedEvent)
export class PromptPublishedEventHandler
  implements IEventHandler<PromptPublishedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptUserPublicRepository: PromptUserPublicRepository,
  ) {}

  async handle(event: PromptPublishedEvent) {
    const { authorId, promptId, title, timestamps, content } = event;

    const author = await this.promptUserPublicRepository.findById(
      authorId.getValue(),
    );

    const promptListItemView = await this.promptListItemViewRepository.findById(
      promptId.getValue(),
    );

    if (!author) return;

    if (promptListItemView) {
      const promptListItemViewToUpdate = new PromptListItemView(
        promptId.getValue(),
        title.getValue(),
        content.getPreview(),
        promptListItemView.likedCount,
        promptListItemView.copiedCount,
        promptListItemView.viewCount,
        timestamps.getCreatedAt(),
        author,
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
      author,
    );

    await this.promptListItemViewRepository.save(promptListItemViewToCreate);
  }
}
