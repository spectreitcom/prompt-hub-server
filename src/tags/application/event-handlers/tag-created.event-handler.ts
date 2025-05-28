import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TagCreatedEvent } from '../../domain';
import { TagEntryViewRepository } from '../ports';
import { TagEntryView } from '../../views';

@EventsHandler(TagCreatedEvent)
export class TagCreatedEventHandler implements IEventHandler<TagCreatedEvent> {
  constructor(
    private readonly tagEntryViewRepository: TagEntryViewRepository,
  ) {}

  async handle(event: TagCreatedEvent): Promise<void> {
    const tagView = new TagEntryView(
      event.id.getValue(),
      event.value.getValue(),
      event.isActive,
      0, // Initial usage count is 0
    );

    await this.tagEntryViewRepository.save(tagView);
  }
}
