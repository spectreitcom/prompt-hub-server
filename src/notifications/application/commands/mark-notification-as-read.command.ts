import { ICommand } from '@nestjs/cqrs';

export class MarkNotificationAsReadCommand implements ICommand {
  constructor(
    public readonly notificationId: string,
    public readonly userId: string,
  ) {}
}
