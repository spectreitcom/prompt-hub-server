import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';

const eventHandlers = [];

const commandHandlers = [];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers],
  exports: [],
})
export class AccountsModule {}