import { UserId, UserNotification, UserNotificationId } from '../../domain';

export abstract class UserNotificationRepository {
  abstract save(notification: UserNotification): Promise<void>;
  abstract markAsRead(
    notificationId: UserNotificationId,
    userId: UserId,
  ): Promise<void>;
  abstract markAllAsRead(userId: UserId): Promise<void>;
  // abstract getForUser(userId: string, limit: number): Promise<NotificationView[]>;
  abstract countUnread(userId: UserId): Promise<number>;
}
