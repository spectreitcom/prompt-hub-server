import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { UserNotificationRepository } from '../application';
import { PrismaUserNotificationRepository } from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserNotificationRepository,
      useClass: PrismaUserNotificationRepository,
    },
  ],
  exports: [UserNotificationRepository],
})
export class InfrastructureModule {}
