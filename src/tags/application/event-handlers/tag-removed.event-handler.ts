import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TagRemovedEvent } from '../../domain';
import { TagEntryViewRepository } from '../ports';

@EventsHandler(TagRemovedEvent)
export class TagRemovedEventHandler implements IEventHandler<TagRemovedEvent> {
  constructor(
    private readonly tagEntryViewRepository: TagEntryViewRepository,
  ) {}

  async handle(event: TagRemovedEvent): Promise<void> {
    // Get the tag ID from the event
    const tagId = event.id.getValue();

    // Find the existing tag view
    const existingTagView = await this.tagEntryViewRepository.findById(tagId);

    if (!existingTagView) {
      return;
    }

    // Remove the tag in the view repository
    await this.tagEntryViewRepository.delete(tagId);
  }
}
