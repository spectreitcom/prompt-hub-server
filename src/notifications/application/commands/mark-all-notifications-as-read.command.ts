import { ICommand } from '@nestjs/cqrs';
import { UserId } from '../../domain';

export class MarkAllNotificationsAsReadCommand implements ICommand {
  constructor(public readonly userId: UserId) {}
}
