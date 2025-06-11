import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  NotificationPromptUserViewRepository,
  NotificationPromptViewRepository,
} from '../ports';
import { NotificationPromptView } from '../../views';
import { PromptUpdatedEvent } from '../../../prompt-hub';

@EventsHandler(PromptUpdatedEvent)
export class PromptUpdatedEventHandler
  implements IEventHandler<PromptUpdatedEvent>
{
  constructor(
    private readonly notificationPromptViewRepository: NotificationPromptViewRepository,
    private readonly notificationPromptUserViewRepository: NotificationPromptUserViewRepository,
  ) {}

  async handle(event: PromptUpdatedEvent) {
    const { promptId, authorId, title } = event;

    const author = await this.notificationPromptUserViewRepository.findById(
      authorId.getValue(),
    );

    if (!author) return;

    const notificationPromptView =
      await this.notificationPromptViewRepository.findById(promptId.getValue());

    if (!notificationPromptView) return;

    const notificationPromptViewToUpdate = new NotificationPromptView(
      notificationPromptView.id,
      title.getValue(),
      author,
    );

    await this.notificationPromptViewRepository.save(
      notificationPromptViewToUpdate,
    );
  }
}
