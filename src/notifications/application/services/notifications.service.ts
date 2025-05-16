import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  MarkNotificationAsReadCommand,
  MarkAllNotificationsAsReadCommand,
} from '../commands';
import {
  GetUserNotificationsQuery,
  GetUnreadNotificationCountQuery,
} from '../queries';
import { NotificationView } from '../../views';
import { UserId, UserNotificationId } from '../../domain';

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
    const command = new MarkNotificationAsReadCommand(
      UserNotificationId.create(notificationId),
      UserId.create(userId),
    );
    return this.commandBus.execute(command);
  }

  /**
   * Marks all notifications as read for a specific user.
   *
   * @param {string} userId - The unique identifier of the user whose notifications will be marked as read.
   * @return {Promise<void>} A promise that resolves when the operation is complete.
   */
  async markAllNotificationsAsRead(userId: string): Promise<void> {
    const command = new MarkAllNotificationsAsReadCommand(
      UserId.create(userId),
    );
    return this.commandBus.execute(command);
  }

  /**
   * Retrieves notifications for a specific user with pagination.
   *
   * @param {string} userId - The unique identifier of the user whose notifications to retrieve.
   * @param {number} take - The number of notifications to retrieve (default: 10).
   * @param {number} skip - The number of notifications to skip for pagination (default: 0).
   * @return {Promise<NotificationView[]>} A promise that resolves to an array of notification views.
   */
  async getUserNotifications(
    userId: string,
    take: number = 10,
    skip: number = 0,
  ): Promise<NotificationView[]> {
    const query = new GetUserNotificationsQuery(
      UserId.create(userId),
      take,
      skip,
    );
    return this.queryBus.execute(query);
  }

  /**
   * Gets the count of unread notifications for a specific user.
   *
   * @param {string} userId - The unique identifier of the user.
   * @return {Promise<number>} A promise that resolves to the count of unread notifications.
   */
  async getUnreadNotificationCount(userId: string): Promise<number> {
    const query = new GetUnreadNotificationCountQuery(UserId.create(userId));
    return this.queryBus.execute(query);
  }
}
