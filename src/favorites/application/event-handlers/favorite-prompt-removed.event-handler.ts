import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FavoritePromptRemovedEvent } from '../../domain';
import { FavoritePromptEntryRepository } from '../ports';

@EventsHandler(FavoritePromptRemovedEvent)
export class FavoritePromptRemovedEventHandler
  implements IEventHandler<FavoritePromptRemovedEvent>
{
  constructor(
    private readonly favoritePromptEntryRepository: FavoritePromptEntryRepository,
  ) {}

  async handle(event: FavoritePromptRemovedEvent) {
    const { promptId, userId } = event;

    const favoritePromptEntryView =
      await this.favoritePromptEntryRepository.findByUserAndPrompt(
        userId.getValue(),
        promptId.getValue(),
      );

    if (!favoritePromptEntryView) return;

    await this.favoritePromptEntryRepository.delete(
      userId.getValue(),
      promptId.getValue(),
    );
  }
}
