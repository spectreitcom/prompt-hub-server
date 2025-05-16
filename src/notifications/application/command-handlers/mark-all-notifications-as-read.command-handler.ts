import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkAllNotificationsAsReadCommand } from '../commands';
import { UserNotificationRepository } from '../ports';
import { Logger } from '@nestjs/common';

@CommandHandler(MarkAllNotificationsAsReadCommand)
export class MarkAllNotificationsAsReadCommandHandler
  implements ICommandHandler<MarkAllNotificationsAsReadCommand>
{
  private readonly logger = new Logger(
    MarkAllNotificationsAsReadCommandHandler.name,
  );

  constructor(private readonly repository: UserNotificationRepository) {}

  async execute(command: MarkAllNotificationsAsReadCommand): Promise<void> {
    this.logger.debug(
      `Marking all notifications as read for user: ${command.userId}`,
    );

    await this.repository.markAllAsRead(command.userId);
  }
}
