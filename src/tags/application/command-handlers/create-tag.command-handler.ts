import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateTagCommand } from '../commands';
import { TagRepository } from '../ports';
import { Tag, TagValue, TagAlreadyExistsException } from '../../domain';
import { TagEntryView } from '../../views';

@CommandHandler(CreateTagCommand)
export class CreateTagCommandHandler
  implements ICommandHandler<CreateTagCommand, TagEntryView>
{
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateTagCommand): Promise<TagEntryView> {
    const { value } = command;

    // Create TagValue from raw string
    const tagValue = TagValue.create(value);

    // Check if tag with this value already exists
    const exists = await this.tagRepository.existsByValue(tagValue);
    if (exists) {
      throw new TagAlreadyExistsException(tagValue.getValue());
    }

    // Create new tag
    const tag = this.eventPublisher.mergeObjectContext(Tag.create(tagValue));

    // Save tag to repository
    await this.tagRepository.save(tag);

    // Commit events
    tag.commit();

    // Create and return a TagEntryView
    return new TagEntryView(
      tag.getId().getValue(),
      tag.getValue().getValue(),
      tag.getIsActive(),
      0, // Initial usage count is 0
    );
  }
}
