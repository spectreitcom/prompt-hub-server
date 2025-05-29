import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { UserNotificationRepository } from '../../application';
import { UserId, UserNotification, UserNotificationId } from '../../domain';

@Injectable()
export class PrismaUserNotificationRepository
  implements UserNotificationRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async countUnread(userId: UserId): Promise<number> {
    return this.prisma.userNotification.count({
      where: {
        userId: userId.getValue(),
        isRead: false,
      },
    });
  }

  async markAllAsRead(userId: UserId): Promise<void> {
    await this.prisma.userNotification.updateMany({
      where: {
        userId: userId.getValue(),
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }

  async markAsRead(
    notificationId: UserNotificationId,
    userId: UserId,
  ): Promise<void> {
    await this.prisma.userNotification.update({
      where: {
        id: notificationId.getValue(),
        userId: userId.getValue(),
      },
      data: {
        isRead: true,
      },
    });
  }

  async save(notification: UserNotification): Promise<void> {
    await this.prisma.userNotification.upsert({
      where: {
        id: notification.getId().getValue(),
      },
      update: {
        userId: notification.getUserId().getValue(),
        type: notification.getType().getValue(),
        payload: notification.getPayload().toObject(),
        isRead: notification.getIsRead(),
        createdAt: notification.getCreatedAt(),
      },
      create: {
        id: notification.getId().getValue(),
        userId: notification.getUserId().getValue(),
        type: notification.getType().getValue(),
        payload: notification.getPayload().toObject(),
        isRead: notification.getIsRead(),
        createdAt: notification.getCreatedAt(),
      },
    });
  }
}
