import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptPublishedEvent } from '../../../prompt-hub/domain';
import {
  NotificationPromptUserViewRepository,
  NotificationPromptViewRepository,
} from '../ports';
import { NotificationPromptView } from '../../views';

@EventsHandler(PromptPublishedEvent)
export class PromptPublishedEventHandler
  implements IEventHandler<PromptPublishedEvent>
{
  constructor(
    private readonly notificationPromptUserViewRepository: NotificationPromptUserViewRepository,
    private readonly notificationPromptViewRepository: NotificationPromptViewRepository,
  ) {}

  async handle(event: PromptPublishedEvent) {
    const { authorId, promptId, title } = event;

    const author = await this.notificationPromptUserViewRepository.findById(
      authorId.getValue(),
    );

    if (!author) return;

    const notificationPromptView = new NotificationPromptView(
      promptId.getValue(),
      title.getValue(),
      author,
    );

    await this.notificationPromptViewRepository.save(notificationPromptView);
  }
}
