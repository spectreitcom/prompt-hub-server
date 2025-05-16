import { ICommand } from '@nestjs/cqrs';
import { UserId, UserNotificationId } from '../../domain';

export class MarkNotificationAsReadCommand implements ICommand {
  constructor(
    public readonly notificationId: UserNotificationId,
    public readonly userId: UserId,
  ) {}
}
