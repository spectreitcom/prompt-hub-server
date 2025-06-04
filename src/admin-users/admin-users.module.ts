import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  GetPublicAdminUserViewQueryHandler,
  AdminUserCreatedEventHandler,
  CreateAdminUserCli,
  CommandHandlers,
  AdminUsersService,
} from './application';

const eventHandlers = [AdminUserCreatedEventHandler];

const queryHandlers = [GetPublicAdminUserViewQueryHandler];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [
    AdminUsersService,
    ...eventHandlers,
    ...CommandHandlers,
    ...queryHandlers,
    CreateAdminUserCli,
  ],
  exports: [CreateAdminUserCli, AdminUsersService],
})
export class AdminUsersModule {}
