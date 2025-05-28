import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTagCommand } from '../commands';
import { GetPopularTagsQuery } from '../queries';
import { TagEntryView } from '../../views';

@Injectable()
export class TagsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Creates a new tag using the provided value.
   *
   * @param {string} value - The name or value of the tag to be created.
   * @return {Promise<TagEntryView>} A promise that resolves to the created tag view.
   */
  async createTag(value: string): Promise<TagEntryView> {
    return this.commandBus.execute(new CreateTagCommand(value));
  }

  /**
   * Gets popular tags with optional search filter.
   *
   * @param {number} skip - Number of items to skip for pagination.
   * @param {number} take - Number of items to take for pagination.
   * @param {string} [search] - Optional search term to filter tags.
   * @return {Promise<TagEntryView[]>} A promise that resolves to an array of popular tags.
   */
  async getPopularTags(
    skip: number = 0,
    take: number = 10,
    search?: string,
  ): Promise<TagEntryView[]> {
    return this.queryBus.execute(new GetPopularTagsQuery(skip, take, search));
  }
}
