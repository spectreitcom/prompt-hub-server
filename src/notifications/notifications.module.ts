import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import { EventHandlers } from './application';

const eventHandlers = [...EventHandlers];

const commandHandlers = [];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers],
  exports: [],
})
export class NotificationsModule {}
