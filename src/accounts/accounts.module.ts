import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  AccountsService,
  SignUpWithGmailCommandHandler,
  GetPublicUserViewQueryHandler,
  UserCreatedEventHandler,
} from './application';

const eventHandlers = [UserCreatedEventHandler];

const commandHandlers = [SignUpWithGmailCommandHandler];

const queryHandlers = [GetPublicUserViewQueryHandler];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [
    ...eventHandlers,
    ...commandHandlers,
    ...queryHandlers,
    AccountsService,
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
