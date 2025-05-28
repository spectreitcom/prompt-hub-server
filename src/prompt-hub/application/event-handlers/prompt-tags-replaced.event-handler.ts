import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptTagsReplacedEvent } from '../../domain';
import {
  PromptDetailsViewRepository,
  PromptListItemViewRepository,
} from '../ports';

@EventsHandler(PromptTagsReplacedEvent)
export class PromptTagsReplacedEventHandler
  implements IEventHandler<PromptTagsReplacedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptTagsReplacedEvent) {
    const { promptId, tags } = event;

    // Currently, the view models don't include tags
    // This handler is a placeholder for future implementation
    // When tags are added to the view models, this handler should be updated to:
    // 1. Find the prompt view models by ID
    // 2. Update the tags in the view models
    // 3. Save the updated view models

    console.log(
      `Tags replaced for prompt ${promptId.getValue()}: ${tags.map((tag) => tag.getValue()).join(', ')}`,
    );
  }
}
