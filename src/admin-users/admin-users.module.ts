import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  GetPublicAdminUserViewQueryHandler,
  AdminUserCreatedEventHandler,
  CreateAdminUserCli,
  CommandHandlers,
} from './application';

const eventHandlers = [AdminUserCreatedEventHandler];

const queryHandlers = [GetPublicAdminUserViewQueryHandler];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [
    ...eventHandlers,
    ...CommandHandlers,
    ...queryHandlers,
    CreateAdminUserCli,
  ],
  exports: [CreateAdminUserCli],
})
export class AdminUsersModule {}
