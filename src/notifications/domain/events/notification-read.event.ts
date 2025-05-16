import { NotificationId } from '../value-objects';
import { UserId } from '../value-objects';

export class NotificationReadEvent {
  constructor(
    public readonly id: NotificationId,
    public readonly userId: UserId,
  ) {}
}
