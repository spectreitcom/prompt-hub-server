import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { UserNotificationReadRepository } from '../../application';
import { UserId } from '../../domain';
import { NotificationView } from '../../views';

@Injectable()
export class PrismaUserNotificationReadRepository
  implements UserNotificationReadRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findForUser(
    id: UserId,
    take: number,
    skip: number,
  ): Promise<NotificationView[]> {
    const notifications = await this.prisma.userNotification.findMany({
      where: {
        userId: id.getValue(),
      },
      orderBy: {
        createdAt: 'desc', // Sort from newest to oldest
      },
      take,
      skip,
    });

    return notifications.map(
      (notification) =>
        new NotificationView(
          notification.id,
          notification.type,
          notification.payload as Record<string, any>,
          notification.isRead,
          notification.createdAt,
        ),
    );
  }

  async countUnreadForUser(id: UserId): Promise<number> {
    return this.prisma.userNotification.count({
      where: {
        userId: id.getValue(),
        isRead: false,
      },
    });
  }
}
