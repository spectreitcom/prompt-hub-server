import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  EventHandlers,
  CommandHandlers,
  QueryHandlers,
  NotificationsService,
} from './application';

const eventHandlers = [...EventHandlers];

const commandHandlers = [...CommandHandlers];

const queryHandlers = [...QueryHandlers];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [
    ...eventHandlers,
    ...commandHandlers,
    ...queryHandlers,
    NotificationsService,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
