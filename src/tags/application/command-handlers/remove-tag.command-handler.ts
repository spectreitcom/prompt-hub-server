import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveTagCommand } from '../commands';
import { TagRepository } from '../ports';
import { TagId, TagNotFoundException } from '../../domain';

@CommandHandler(RemoveTagCommand)
export class RemoveTagCommandHandler
  implements ICommandHandler<RemoveTagCommand>
{
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: RemoveTagCommand): Promise<void> {
    const { id } = command;

    // Create TagId from raw string
    const tagId = TagId.create(id);

    try {
      // Find the tag
      const tag = await this.tagRepository.findById(tagId);

      if (!tag) {
        throw new TagNotFoundException(id);
      }

      // Merge the tag with the event publisher
      const tagWithEvents = this.eventPublisher.mergeObjectContext(tag);

      // Call the remove method to apply the TagRemovedEvent
      tagWithEvents.remove();

      // Remove the tag from the repository
      await this.tagRepository.remove(tagId);

      // Commit events
      tagWithEvents.commit();
    } catch (error) {
      throw error;
    }
  }
}
