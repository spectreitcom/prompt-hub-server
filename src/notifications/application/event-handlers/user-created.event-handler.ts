import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../../../accounts';
import {
  NotificationPromptUserViewRepository,
  UserNotificationRepository,
} from '../ports';
import {
  NotificationPayload,
  NotificationType,
  UserNotification,
  UserId,
} from '../../domain';
import { NotificationPromptUserView } from '../../views';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(
    private readonly userNotificationRepository: UserNotificationRepository,
    private readonly notificationPromptUserViewRepository: NotificationPromptUserViewRepository,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const userId = UserId.create(event.userId.getValue());
    const userName = event.name.getValue();
    const avatarUrl = event.avatarUrl.getValue();
    const email = event.email.getValue();

    const notificationPromptUserView = new NotificationPromptUserView(
      userId.getValue(),
      userName,
      email,
      avatarUrl,
    );

    await this.notificationPromptUserViewRepository.save(
      notificationPromptUserView,
    );

    const notificationType = NotificationType.create(
      NotificationType.SIMPLE_INFO,
    );
    const notificationPayload = NotificationPayload.create(
      'Welcome to Prompt Hub!',
      `Hello ${userName}, welcome to Prompt Hub! We're excited to have you join our community. Start exploring and sharing prompts today!`,
    );

    const notification = UserNotification.create(
      userId,
      notificationType,
      notificationPayload,
    );

    await this.userNotificationRepository.save(notification);
  }
}
