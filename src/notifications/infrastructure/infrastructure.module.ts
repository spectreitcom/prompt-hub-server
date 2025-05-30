import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  UserNotificationRepository,
  UserNotificationReadRepository,
  NotificationPromptViewRepository,
  NotificationPromptUserViewRepository,
} from '../application';
import {
  PrismaUserNotificationRepository,
  PrismaUserNotificationReadRepository,
  PrismaNotificationPromptViewRepository,
  PrismaNotificationPromptUserViewRepository,
} from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserNotificationRepository,
      useClass: PrismaUserNotificationRepository,
    },
    {
      provide: UserNotificationReadRepository,
      useClass: PrismaUserNotificationReadRepository,
    },
    {
      provide: NotificationPromptViewRepository,
      useClass: PrismaNotificationPromptViewRepository,
    },
    {
      provide: NotificationPromptUserViewRepository,
      useClass: PrismaNotificationPromptUserViewRepository,
    },
  ],
  exports: [
    UserNotificationRepository,
    UserNotificationReadRepository,
    NotificationPromptViewRepository,
    NotificationPromptUserViewRepository,
  ],
})
export class InfrastructureModule {}
