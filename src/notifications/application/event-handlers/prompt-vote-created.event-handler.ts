import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteCreatedEvent } from '../../../voting/domain';
import {
  NotificationPromptViewRepository,
  UserNotificationRepository,
} from '../ports';
import {
  NotificationPayload,
  NotificationType,
  UserId,
  UserNotification,
} from '../../domain';

@EventsHandler(PromptVoteCreatedEvent)
export class PromptVoteCreatedEventHandler
  implements IEventHandler<PromptVoteCreatedEvent>
{
  constructor(
    private readonly notificationPromptViewRepository: NotificationPromptViewRepository,
    private readonly userNotificationRepository: UserNotificationRepository,
  ) {}

  async handle(event: PromptVoteCreatedEvent): Promise<void> {
    const { promptId, userId, voteType } = event;

    if (voteType.isDown()) return;

    const notificationPromptView =
      await this.notificationPromptViewRepository.findById(promptId.getValue());

    if (!notificationPromptView) return;

    if (notificationPromptView.author.id === userId.getValue()) return;

    const notificationType = NotificationType.create(
      NotificationType.SIMPLE_INFO,
    );

    const notificationPayload = NotificationPayload.create(
      'Your prompt received an upvote!',
      `${notificationPromptView.author.name} liked your prompt "${notificationPromptView.title}"`,
    );

    const notification = UserNotification.create(
      UserId.create(userId.getValue()),
      notificationType,
      notificationPayload,
    );

    await this.userNotificationRepository.save(notification);
  }
}
