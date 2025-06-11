import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptTagsReplacedEvent } from '../../../prompt-hub';
import { TagEntryViewRepository } from '../ports';

@EventsHandler(PromptTagsReplacedEvent)
export class PromptTagsReplacedEventHandler
  implements IEventHandler<PromptTagsReplacedEvent>
{
  constructor(
    private readonly tagEntryViewRepository: TagEntryViewRepository,
  ) {}

  async handle(event: PromptTagsReplacedEvent): Promise<void> {
    const { previousTags, newTags } = event;

    try {
      // For each previous tag, decrement its usage count
      for (const tag of previousTags) {
        const tagValue = tag.getValue();
        await this.tagEntryViewRepository.decrementUsage(tagValue);
      }

      // For each new tag, increment its usage count
      for (const tag of newTags) {
        const tagValue = tag.getValue();
        await this.tagEntryViewRepository.incrementUsage(tagValue);
      }
    } catch (error) {
      console.error(
        `Error updating tag usage counts for prompt ${event.promptId.getValue()}:`,
        error,
      );
    }
  }
}
