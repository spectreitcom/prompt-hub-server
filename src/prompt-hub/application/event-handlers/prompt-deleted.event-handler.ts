import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptDeletedEvent } from '../../domain';
import {
  PromptDetailsViewRepository,
  PromptListItemViewRepository,
} from '../ports';

@EventsHandler(PromptDeletedEvent)
export class PromptDeletedEventHandler
  implements IEventHandler<PromptDeletedEvent>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async handle(event: PromptDeletedEvent) {
    const { promptId } = event;

    await this.promptListItemViewRepository.delete(promptId.getValue());
    await this.promptDetailsViewRepository.delete(promptId.getValue());
  }
}
