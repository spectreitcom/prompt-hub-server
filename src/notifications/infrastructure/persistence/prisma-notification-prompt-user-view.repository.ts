import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { NotificationPromptUserViewRepository } from '../../application';
import { NotificationPromptUserView } from '../../views';

@Injectable()
export class PrismaNotificationPromptUserViewRepository
  implements NotificationPromptUserViewRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(
    notificationPromptUserView: NotificationPromptUserView,
  ): Promise<void> {
    await this.prisma.notificationPromptUserView.upsert({
      where: {
        id: notificationPromptUserView.id,
      },
      update: {
        name: notificationPromptUserView.name,
        email: notificationPromptUserView.email,
        avatarUrl: notificationPromptUserView.avatarUrl,
      },
      create: {
        id: notificationPromptUserView.id,
        name: notificationPromptUserView.name,
        email: notificationPromptUserView.email,
        avatarUrl: notificationPromptUserView.avatarUrl,
      },
    });
  }

  async findById(id: string): Promise<NotificationPromptUserView> {
    const userView = await this.prisma.notificationPromptUserView.findUnique({
      where: {
        id,
      },
    });

    if (!userView) {
      return null;
    }

    return new NotificationPromptUserView(
      userView.id,
      userView.name,
      userView.email,
      userView.avatarUrl,
    );
  }
}
