import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPromptListQuery, GetOtherAuthorPromptsQuery } from '../queries';
import { SearchPromptEntryView } from '../../views';

@Injectable()
export class SearchService {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * Retrieves a list of prompts based on the provided parameters.
   *
   * @param {number} skip - The number of items to skip from the beginning of the list.
   * @param {number} take - The number of items to take from the list.
   * @param {string} [search] - An optional search term to filter the prompts.
   * @return {Promise<SearchPromptEntryView[]>} A promise that resolves to an array of prompt entries.
   */
  async getPromptList(
    skip: number,
    take: number,
    search?: string,
  ): Promise<SearchPromptEntryView[]> {
    return this.queryBus.execute(new GetPromptListQuery(take, skip, search));
  }

  /**
   * Retrieves a list of prompts by a specific author.
   *
   * @param {string} authorId - The ID of the author whose prompts to retrieve.
   * @param {number} skip - The number of items to skip from the beginning of the list.
   * @param {number} take - The number of items to take from the list.
   * @param {string[]} [excludedPromptIds] - Optional array of prompt IDs to exclude from the results.
   * @param {string} [search] - Optional search term to filter the prompts.
   * @return {Promise<SearchPromptEntryView[]>} A promise that resolves to an array of prompt entries.
   */
  async getOtherAuthorPrompts(
    authorId: string,
    skip: number,
    take: number,
    excludedPromptIds?: string[],
    search?: string,
  ): Promise<SearchPromptEntryView[]> {
    return this.queryBus.execute(
      new GetOtherAuthorPromptsQuery(
        authorId,
        take,
        skip,
        excludedPromptIds,
        search,
      ),
    );
  }
}
