import { UserNotificationId, UserId } from '../value-objects';

export class NotificationUnreadEvent {
  constructor(
    public readonly id: UserNotificationId,
    public readonly userId: UserId,
  ) {}
}
