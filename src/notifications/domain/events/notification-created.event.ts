import { NotificationId } from '../value-objects';
import { UserId } from '../value-objects';
import { NotificationType } from '../value-objects';

export class NotificationCreatedEvent {
  constructor(
    public readonly id: NotificationId,
    public readonly userId: UserId,
    public readonly type: NotificationType,
    public readonly payload: Record<string, any>,
    public readonly createdAt: Date,
  ) {}
}
