import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  UserNotificationRepository,
  UserNotificationReadRepository,
} from '../application';
import {
  PrismaUserNotificationRepository,
  PrismaUserNotificationReadRepository,
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
  ],
  exports: [UserNotificationRepository, UserNotificationReadRepository],
})
export class InfrastructureModule {}
