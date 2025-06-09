import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TagRemovedEvent } from '../../../tags';

@EventsHandler(TagRemovedEvent)
export class TagRemovedEventHandler implements IEventHandler<TagRemovedEvent> {
  constructor() {}

  async handle(event: TagRemovedEvent): Promise<void> {
    // todo: implement
  }
}
