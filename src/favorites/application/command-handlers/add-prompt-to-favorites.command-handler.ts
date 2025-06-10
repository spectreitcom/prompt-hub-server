import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AddPromptToFavoritesCommand } from '../commands';
import { FavoritePromptRepository } from '../ports';
import { FavoritePrompt, PromptAlreadyInFavoritesException } from '../../domain';

@CommandHandler(AddPromptToFavoritesCommand)
export class AddPromptToFavoritesCommandHandler
  implements ICommandHandler<AddPromptToFavoritesCommand, void>
{
  constructor(
    private readonly favoritePromptRepository: FavoritePromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: AddPromptToFavoritesCommand): Promise<void> {
    const { promptId, userId } = command;

    // Check if the prompt is already in favorites
    const exists =
      await this.favoritePromptRepository.existsByPromptIdAndUserId(
        promptId,
        userId,
      );

    if (exists) {
      throw new PromptAlreadyInFavoritesException(promptId, userId);
    }

    // Create a new favorite prompt
    const favoritePrompt = FavoritePrompt.create(promptId, userId);

    // Mark the favorite prompt as an event publisher
    const favoritePromptWithEvents =
      this.eventPublisher.mergeObjectContext(favoritePrompt);

    // Save the favorite prompt
    await this.favoritePromptRepository.save(favoritePrompt);

    // Commit events after saving
    favoritePromptWithEvents.commit();
  }
}
