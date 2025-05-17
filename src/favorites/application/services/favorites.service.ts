import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddPromptToFavoritesCommand,
  RemovePromptFromFavoritesCommand,
} from '../commands';
import { PromptId, UserId } from '../../domain';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Adds a prompt to the user's favorites.
   *
   * @param {string} promptId - The unique identifier of the prompt to add to favorites.
   * @param {string} userId - The unique identifier of the user.
   * @return {Promise<void>} Resolves when the prompt has been successfully added to favorites.
   */
  async addPromptToFavorites(promptId: string, userId: string): Promise<void> {
    const command = new AddPromptToFavoritesCommand(
      PromptId.create(promptId),
      UserId.create(userId),
    );
    return this.commandBus.execute(command);
  }

  /**
   * Removes a prompt from the user's favorites.
   *
   * @param {string} promptId - The unique identifier of the prompt to remove from favorites.
   * @param {string} userId - The unique identifier of the user.
   * @return {Promise<void>} Resolves when the prompt has been successfully removed from favorites.
   */
  async removePromptFromFavorites(
    promptId: string,
    userId: string,
  ): Promise<void> {
    const command = new RemovePromptFromFavoritesCommand(
      PromptId.create(promptId),
      UserId.create(userId),
    );
    return this.commandBus.execute(command);
  }
}
