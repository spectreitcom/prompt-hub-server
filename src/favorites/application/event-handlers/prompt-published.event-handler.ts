import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptPublishedEvent } from '../../../prompt-hub';
import { FavoritePromptViewRepository } from '../ports';
import { FavoritePromptView } from '../../views';

@EventsHandler(PromptPublishedEvent)
export class PromptPublishedEventHandler
  implements IEventHandler<PromptPublishedEvent>
{
  constructor(
    private readonly favoritePromptViewRepository: FavoritePromptViewRepository,
  ) {}

  async handle(event: PromptPublishedEvent) {
    const { promptId, authorId, title, timestamps } = event;
    await this.favoritePromptViewRepository.save(
      new FavoritePromptView(
        promptId.getValue(),
        title.getValue(),
        authorId.getValue(),
        timestamps.getCreatedAt(),
      ),
    );
  }
}
