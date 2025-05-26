import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemovePromptFromFavoritesCommand } from '../commands';
import { FavoritePromptRepository } from '../ports';

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
      throw new Error(
        `Prompt with id ${promptId} is not in favorites for user with id ${userId}.`,
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
