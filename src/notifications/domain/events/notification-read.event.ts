import { UserNotificationId } from '../value-objects';
import { UserId } from '../value-objects';

export class NotificationReadEvent {
  constructor(
    public readonly id: UserNotificationId,
    public readonly userId: UserId,
  ) {}
}
