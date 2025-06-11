import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NotificationPromptViewRepository } from '../ports';
import { PromptDeletedEvent } from '../../../prompt-hub';

@EventsHandler(PromptDeletedEvent)
export class PromptDeletedEventHandler
  implements IEventHandler<PromptDeletedEvent>
{
  constructor(
    private readonly notificationPromptViewRepository: NotificationPromptViewRepository,
  ) {}

  async handle(event: PromptDeletedEvent) {
    const { promptId } = event;
    await this.notificationPromptViewRepository.delete(promptId.getValue());
  }
}
