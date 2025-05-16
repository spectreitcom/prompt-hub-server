import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import { SignUpWithGmailCommandHandler } from './application';

const eventHandlers = [];

const commandHandlers = [SignUpWithGmailCommandHandler];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers],
  exports: [],
})
export class AccountsModule {}
