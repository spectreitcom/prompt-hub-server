import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreatePromptCommand,
  UpdatePromptCommand,
  PublishPromptCommand,
  SetPromptVisibilityCommand,
  CopyPromptCommand,
  DeletePromptCommand,
  CreatePromptCatalogCommand,
  RenamePromptCatalogCommand,
  DeletePromptCatalogCommand,
  AddPromptToCatalogCommand,
  RemovePromptFromCatalogCommand,
} from '../commands';

@Injectable()
export class PromptHubService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  /**
   * Creates a new prompt for a given author.
   *
   * @param {string} authorId - The unique identifier of the author creating the prompt.
   * @return {Promise<void>} Resolves when the prompt has been successfully created.
   */
  async createPrompt(authorId: string): Promise<void> {
    const command = new CreatePromptCommand(authorId);
    return this.commandBus.execute(command);
  }

  /**
   * Updates an existing prompt with new content.
   *
   * @param {string} promptId - The unique identifier of the prompt to update.
   * @param {string} title - The new title for the prompt.
   * @param {string} content - The new content for the prompt.
   * @param {string} userId - The unique identifier of the user updating the prompt.
   * @return {Promise<void>} Resolves when the prompt has been successfully updated.
   */
  async updatePrompt(
    promptId: string,
    title: string,
    content: string,
    userId: string,
  ): Promise<void> {
    const command = new UpdatePromptCommand(promptId, title, content, userId);
    return this.commandBus.execute(command);
  }

  /**
   * Publishes a prompt, making it available to other users.
   *
   * @param {string} promptId - The unique identifier of the prompt to publish.
   * @param {string} userId - The unique identifier of the user publishing the prompt.
   * @return {Promise<void>} Resolves when the prompt has been successfully published.
   */
  async publishPrompt(promptId: string, userId: string): Promise<void> {
    const command = new PublishPromptCommand(promptId, userId);
    return this.commandBus.execute(command);
  }

  /**
   * Sets the visibility of a prompt to public or private.
   *
   * @param {string} promptId - The unique identifier of the prompt to update.
   * @param {boolean} isPublic - Whether the prompt should be public (true) or private (false).
   * @param {string} userId - The unique identifier of the user changing the visibility.
   * @return {Promise<void>} Resolves when the prompt visibility has been successfully updated.
   */
  async setPromptVisibility(
    promptId: string,
    isPublic: boolean,
    userId: string,
  ): Promise<void> {
    const command = new SetPromptVisibilityCommand(promptId, isPublic, userId);
    return this.commandBus.execute(command);
  }

  /**
   * Creates a copy of an existing prompt for a user.
   *
   * @param {string} promptId - The unique identifier of the prompt to copy.
   * @param {string} userId - The unique identifier of the user copying the prompt.
   * @return {Promise<void>} Resolves when the prompt has been successfully copied.
   */
  async copyPrompt(promptId: string, userId: string): Promise<void> {
    const command = new CopyPromptCommand(promptId, userId);
    return this.commandBus.execute(command);
  }

  /**
   * Deletes a prompt.
   *
   * @param {string} promptId - The unique identifier of the prompt to delete.
   * @param {string} userId - The unique identifier of the user deleting the prompt.
   * @return {Promise<void>} Resolves when the prompt has been successfully deleted.
   */
  async deletePrompt(promptId: string, userId: string): Promise<void> {
    const command = new DeletePromptCommand(promptId, userId);
    return this.commandBus.execute(command);
  }

  /**
   * Creates a new prompt catalog.
   *
   * @param {string} ownerId - The unique identifier of the owner of the catalog.
   * @param {string} name - The name of the catalog.
   * @return {Promise<void>} Resolves when the catalog has been successfully created.
   */
  async createPromptCatalog(ownerId: string, name: string): Promise<void> {
    const command = new CreatePromptCatalogCommand(ownerId, name);
    return this.commandBus.execute(command);
  }

  /**
   * Renames an existing prompt catalog.
   *
   * @param {string} catalogId - The unique identifier of the catalog to rename.
   * @param {string} newName - The new name for the catalog.
   * @param {string} userId - The unique identifier of the user renaming the catalog.
   * @return {Promise<void>} Resolves when the catalog has been successfully renamed.
   */
  async renamePromptCatalog(
    catalogId: string,
    newName: string,
    userId: string,
  ): Promise<void> {
    const command = new RenamePromptCatalogCommand(catalogId, newName, userId);
    return this.commandBus.execute(command);
  }

  /**
   * Deletes a prompt catalog.
   *
   * @param {string} catalogId - The unique identifier of the catalog to delete.
   * @param {string} userId - The unique identifier of the user deleting the catalog.
   * @return {Promise<void>} Resolves when the catalog has been successfully deleted.
   */
  async deletePromptCatalog(catalogId: string, userId: string): Promise<void> {
    const command = new DeletePromptCatalogCommand(catalogId, userId);
    return this.commandBus.execute(command);
  }

  /**
   * Adds a prompt to a catalog.
   *
   * @param {string} catalogId - The unique identifier of the catalog to add the prompt to.
   * @param {string} promptId - The unique identifier of the prompt to add.
   * @param {string} userId - The unique identifier of the user adding the prompt.
   * @return {Promise<void>} Resolves when the prompt has been successfully added to the catalog.
   */
  async addPromptToCatalog(
    catalogId: string,
    promptId: string,
    userId: string,
  ): Promise<void> {
    const command = new AddPromptToCatalogCommand(catalogId, promptId, userId);
    return this.commandBus.execute(command);
  }

  /**
   * Removes a prompt from a catalog.
   *
   * @param {string} catalogId - The unique identifier of the catalog to remove the prompt from.
   * @param {string} promptId - The unique identifier of the prompt to remove.
   * @param {string} userId - The unique identifier of the user removing the prompt.
   * @return {Promise<void>} Resolves when the prompt has been successfully removed from the catalog.
   */
  async removePromptFromCatalog(
    catalogId: string,
    promptId: string,
    userId: string,
  ): Promise<void> {
    const command = new RemovePromptFromCatalogCommand(
      catalogId,
      promptId,
      userId,
    );
    return this.commandBus.execute(command);
  }
}
