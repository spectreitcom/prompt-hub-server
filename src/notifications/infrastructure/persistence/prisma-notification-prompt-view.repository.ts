import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { NotificationPromptViewRepository } from '../../application';
import { NotificationPromptView } from '../../views';

@Injectable()
export class PrismaNotificationPromptViewRepository
  implements NotificationPromptViewRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(notificationPromptView: NotificationPromptView): Promise<void> {
    await this.prisma.notificationPromptView.upsert({
      where: {
        id: notificationPromptView.id,
      },
      update: {
        title: notificationPromptView.title,
        authorId: notificationPromptView.author.id,
        authorName: notificationPromptView.author.name,
        authorAvatarUrl: notificationPromptView.author.avatarUrl,
      },
      create: {
        id: notificationPromptView.id,
        title: notificationPromptView.title,
        authorId: notificationPromptView.author.id,
        authorName: notificationPromptView.author.name,
        authorAvatarUrl: notificationPromptView.author.avatarUrl,
      },
    });
  }

  async findById(id: string): Promise<NotificationPromptView> {
    const promptView = await this.prisma.notificationPromptView.findUnique({
      where: {
        id,
      },
    });

    if (!promptView) {
      return null;
    }

    const authorView = await this.prisma.notificationPromptUserView.findUnique({
      where: {
        id: promptView.authorId,
      },
    });

    if (!authorView) {
      return null;
    }

    return new NotificationPromptView(promptView.id, promptView.title, {
      id: authorView.id,
      name: authorView.name,
      email: authorView.email,
      avatarUrl: authorView.avatarUrl,
    });
  }
}
