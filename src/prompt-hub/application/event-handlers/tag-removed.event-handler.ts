import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TagRemovedEvent } from '../../../tags';
import { PromptRepository } from '../ports';
import { TagValue } from '../../domain';

@EventsHandler(TagRemovedEvent)
export class TagRemovedEventHandler implements IEventHandler<TagRemovedEvent> {
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async handle(event: TagRemovedEvent): Promise<void> {
    const { value } = event;

    const tagValue = TagValue.create(value.getValue());

    const prompts = await this.promptRepository.findByTag(tagValue);

    for (const prompt of prompts) {
      const currentTags = prompt.getTags();
      const newTags = currentTags.filter((tag) => !tag.equals(tagValue));
      const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);
      promptWithEvents.replaceTags(newTags);
      await this.promptRepository.save(promptWithEvents);
      promptWithEvents.commit();
    }
  }
}
