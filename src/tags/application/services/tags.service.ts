import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTagCommand } from '../commands';

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
   * @return {Promise<void>} A promise that resolves when the tag is successfully created.
   */
  async createTag(value: string): Promise<void> {
    return this.commandBus.execute(new CreateTagCommand(value));
  }
}
