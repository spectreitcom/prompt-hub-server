import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptTagsReplacedEvent } from '../../../prompt-hub/domain';
import { TagEntryViewRepository } from '../ports';

@EventsHandler(PromptTagsReplacedEvent)
export class PromptTagsReplacedEventHandler
  implements IEventHandler<PromptTagsReplacedEvent>
{
  constructor(
    private readonly tagEntryViewRepository: TagEntryViewRepository,
  ) {}

  async handle(event: PromptTagsReplacedEvent) {
    const { previousTags, newTags } = event;

    try {
      // For each previous tag, decrement its usage count
      for (const tag of previousTags) {
        const tagId = tag.getValue();
        await this.tagEntryViewRepository.decrementUsage(tagId);
      }

      // For each new tag, increment its usage count
      for (const tag of newTags) {
        const tagId = tag.getValue();
        await this.tagEntryViewRepository.incrementUsage(tagId);
      }
    } catch (error) {
      console.error(
        `Error updating tag usage counts for prompt ${event.promptId.getValue()}:`,
        error,
      );
    }
  }
}
