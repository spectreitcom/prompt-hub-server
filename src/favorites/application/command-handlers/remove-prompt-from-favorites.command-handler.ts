import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemovePromptFromFavoritesCommand } from '../commands';
import { FavoritePromptRepository } from '../ports';
import { PromptNotInFavoritesException } from '../../domain';

@CommandHandler(RemovePromptFromFavoritesCommand)
export class RemovePromptFromFavoritesCommandHandler
  implements ICommandHandler<RemovePromptFromFavoritesCommand, void>
{
  constructor(
    private readonly favoritePromptRepository: FavoritePromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: RemovePromptFromFavoritesCommand): Promise<void> {
    const { promptId, userId } = command;

    // Check if the prompt is in favorites
    const favoritePrompt =
      await this.favoritePromptRepository.getByPromptIdAndUserId(
        promptId,
        userId,
      );

    if (!favoritePrompt) {
      throw new PromptNotInFavoritesException(
        promptId.getValue(),
        userId.getValue(),
      );
    }

    // Mark the favorite prompt as an event publisher
    const favoritePromptWithEvents =
      this.eventPublisher.mergeObjectContext(favoritePrompt);

    favoritePromptWithEvents.remove();

    // Remove the favorite prompt
    await this.favoritePromptRepository.remove(
      favoritePromptWithEvents.getId(),
    );

    // Commit events after removing
    favoritePromptWithEvents.commit();
  }
}
