import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';

const eventHandlers = [];

const commandHandlers = [];

const queryHandlers = [];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers, ...queryHandlers],
  exports: [],
})
export class AdminUsersModule {}
