import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FavoritePromptCreatedEvent } from '../../domain';
import {
  FavoritePromptEntryRepository,
  FavoritePromptViewRepository,
  FavoriteUserPublicRepository,
} from '../ports';
import { FavoritePromptEntryView } from '../../views';

@EventsHandler(FavoritePromptCreatedEvent)
export class FavoritePromptCreatedEventHandler
  implements IEventHandler<FavoritePromptCreatedEvent>
{
  constructor(
    private readonly favoritePromptEntryRepository: FavoritePromptEntryRepository,
    private readonly favoritePromptViewRepository: FavoritePromptViewRepository,
    private readonly favoriteUserPublicRepository: FavoriteUserPublicRepository,
  ) {}

  async handle(event: FavoritePromptCreatedEvent) {
    const { promptId, userId } = event;

    const favoritePromptEntryView =
      await this.favoritePromptEntryRepository.findByUserAndPrompt(
        userId.getValue(),
        promptId.getValue(),
      );

    if (favoritePromptEntryView) return;

    const favoritePromptView = await this.favoritePromptViewRepository.findById(
      promptId.getValue(),
    );

    if (!favoritePromptView) return;

    const favoriteUserPublicView =
      await this.favoriteUserPublicRepository.findById(
        favoritePromptView.authorId,
      );

    if (!favoriteUserPublicView) return;

    const favoritePromptEntryViewToCreate = new FavoritePromptEntryView(
      promptId.getValue(),
      favoritePromptView.title,
      favoriteUserPublicView,
      userId.getValue(),
    );

    await this.favoritePromptEntryRepository.save(
      favoritePromptEntryViewToCreate,
    );
  }
}
