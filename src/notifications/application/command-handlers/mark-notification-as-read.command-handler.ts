import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkNotificationAsReadCommand } from '../commands';
import { UserNotificationRepository } from '../ports';
import { UserId, UserNotificationId } from '../../domain';
import { Logger } from '@nestjs/common';

@CommandHandler(MarkNotificationAsReadCommand)
export class MarkNotificationAsReadCommandHandler
  implements ICommandHandler<MarkNotificationAsReadCommand>
{
  private readonly logger = new Logger(
    MarkNotificationAsReadCommandHandler.name,
  );

  constructor(private readonly repository: UserNotificationRepository) {}

  async execute(command: MarkNotificationAsReadCommand): Promise<void> {
    this.logger.debug(
      `Marking notification as read: ${JSON.stringify(command)}`,
    );

    const notificationId = UserNotificationId.create(command.notificationId);
    const userId = UserId.create(command.userId);

    await this.repository.markAsRead(notificationId, userId);
  }
}
