import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../../../accounts/domain';
import { UserNotificationRepository } from '../ports';
import {
  NotificationPayload,
  NotificationType,
  UserNotification,
  UserId,
} from '../../domain';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(
    private readonly userNotificationRepository: UserNotificationRepository,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const userId = UserId.create(event.userId.getValue());
    const userName = event.name.getValue();

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
