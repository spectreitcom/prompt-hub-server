import { ICommand } from '@nestjs/cqrs';

export class MarkAllNotificationsAsReadCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
