import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TagActivatedEvent } from '../../domain';
import { TagEntryViewRepository } from '../ports';
import { TagEntryView } from '../../views';

@EventsHandler(TagActivatedEvent)
export class TagActivatedEventHandler
  implements IEventHandler<TagActivatedEvent>
{
  constructor(
    private readonly tagEntryViewRepository: TagEntryViewRepository,
  ) {}

  async handle(event: TagActivatedEvent): Promise<void> {
    // Get the tag ID from the event
    const tagId = event.id.getValue();

    // Find the existing tag view
    const existingTagView = await this.tagEntryViewRepository.findById(tagId);

    if (!existingTagView) {
      return;
    }

    // Create a new tag view with isActive set to true, preserving other properties
    const updatedTagView = new TagEntryView(
      existingTagView.id,
      existingTagView.value,
      true, // Set isActive to true
      existingTagView.usageCount,
    );

    // Save the updated tag view
    await this.tagEntryViewRepository.save(updatedTagView);
  }
}
