import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPromptListQuery } from '../queries';
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
}
