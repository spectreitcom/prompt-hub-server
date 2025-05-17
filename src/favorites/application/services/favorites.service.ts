import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddPromptToFavoritesCommand,
  RemovePromptFromFavoritesCommand,
} from '../commands';
import { GetFavoritePromptsQuery } from '../queries';
import { PromptId, UserId } from '../../domain';
import { FavoritePromptEntryView } from '../../views';

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

  /**
   * Gets the favorite prompts for a user.
   *
   * @param {string} userId - The unique identifier of the user.
   * @param {number} skip - The number of records to skip for pagination.
   * @param {number} take - The number of records to take for pagination.
   * @param {string} search - Optional search term to filter prompts.
   * @param {string} authorId - Optional author ID to filter prompts by author.
   * @return {Promise<FavoritePromptEntryView[]>} A promise that resolves to an array of favorite prompt entries.
   */
  async getFavoritePrompts(
    userId: string,
    skip: number = 0,
    take: number = 10,
    search?: string,
    authorId?: string,
  ): Promise<FavoritePromptEntryView[]> {
    const query = new GetFavoritePromptsQuery(
      userId,
      skip,
      take,
      search,
      authorId,
    );
    return this.queryBus.execute(query);
  }
}
