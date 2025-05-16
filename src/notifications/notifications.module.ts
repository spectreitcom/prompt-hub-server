import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  EventHandlers,
  CommandHandlers,
  NotificationsService,
} from './application';

const eventHandlers = [...EventHandlers];

const commandHandlers = [...CommandHandlers];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers, NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
