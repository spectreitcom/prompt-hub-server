import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import { EventHandlers, CommandHandlers } from './application';

const eventHandlers = [...EventHandlers];

const commandHandlers = [...CommandHandlers];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers],
  exports: [],
})
export class NotificationsModule {}
