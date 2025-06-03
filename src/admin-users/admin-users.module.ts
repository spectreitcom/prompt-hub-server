import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPublicAdminUserViewQueryHandler } from './application';

const eventHandlers = [];

const commandHandlers = [];

const queryHandlers = [GetPublicAdminUserViewQueryHandler];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers, ...queryHandlers],
  exports: [],
})
export class AdminUsersModule {}
