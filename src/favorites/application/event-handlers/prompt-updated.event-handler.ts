import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptUpdatedEvent } from '../../../prompt-hub';
import { FavoritePromptViewRepository } from '../ports';
import { FavoritePromptView } from '../../views';

@EventsHandler(PromptUpdatedEvent)
export class PromptUpdatedEventHandler
  implements IEventHandler<PromptUpdatedEvent>
{
  constructor(
    private readonly favoritePromptViewRepository: FavoritePromptViewRepository,
  ) {}

  async handle(event: PromptUpdatedEvent) {
    const { promptId, authorId, title, timestamps } = event;
    const favoritePromptView = await this.favoritePromptViewRepository.findById(
      promptId.getValue(),
    );

    if (!favoritePromptView) return;

    const favoritePromptViewToUpdate = new FavoritePromptView(
      promptId.getValue(),
      title.getValue(),
      authorId.getValue(),
      timestamps.getCreatedAt(),
    );

    await this.favoritePromptViewRepository.save(favoritePromptViewToUpdate);
  }
}
