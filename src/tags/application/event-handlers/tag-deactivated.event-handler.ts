import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TagDeactivatedEvent } from '../../domain';
import { TagEntryViewRepository } from '../ports';
import { TagEntryView } from '../../views';

@EventsHandler(TagDeactivatedEvent)
export class TagDeactivatedEventHandler
  implements IEventHandler<TagDeactivatedEvent>
{
  constructor(
    private readonly tagEntryViewRepository: TagEntryViewRepository,
  ) {}

  async handle(event: TagDeactivatedEvent): Promise<void> {
    // Get the tag ID from the event
    const tagId = event.id.getValue();

    // Find the existing tag view
    const existingTagView = await this.tagEntryViewRepository.findById(tagId);

    if (!existingTagView) {
      return;
    }

    // Create a new tag view with isActive set to false, preserving other properties
    const updatedTagView = new TagEntryView(
      existingTagView.id,
      existingTagView.value,
      false, // Set isActive to false
      existingTagView.usageCount,
    );

    // Save the updated tag view
    await this.tagEntryViewRepository.save(updatedTagView);
  }
}
