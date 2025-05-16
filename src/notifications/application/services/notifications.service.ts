import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  MarkNotificationAsReadCommand,
  MarkAllNotificationsAsReadCommand,
} from '../commands';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Marks a specific notification as read for a given user.
   *
   * @param {string} notificationId - The unique identifier of the notification to mark as read.
   * @param {string} userId - The unique identifier of the user owning the notification.
   * @return {Promise<void>} Resolves when the notification has been successfully marked as read.
   */
  async markNotificationAsRead(
    notificationId: string,
    userId: string,
  ): Promise<void> {
    const command = new MarkNotificationAsReadCommand(notificationId, userId);
    return this.commandBus.execute(command);
  }

  /**
   * Marks all notifications as read for a specific user.
   *
   * @param {string} userId - The unique identifier of the user whose notifications will be marked as read.
   * @return {Promise<void>} A promise that resolves when the operation is complete.
   */
  async markAllNotificationsAsRead(userId: string): Promise<void> {
    const command = new MarkAllNotificationsAsReadCommand(userId);
    return this.commandBus.execute(command);
  }
}
