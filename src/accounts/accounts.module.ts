import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountsService, SignUpWithGmailCommandHandler } from './application';

const eventHandlers = [];

const commandHandlers = [SignUpWithGmailCommandHandler];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers, AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
