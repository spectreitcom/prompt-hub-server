import { NotificationId, UserId } from '../value-objects';

export class NotificationUnreadEvent {
  constructor(
    public readonly id: NotificationId,
    public readonly userId: UserId,
  ) {}
}
