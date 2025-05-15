import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  PromptVoteCreatedEventHandler,
  PromptVoteChangedEventHandler,
} from './application';

const eventHandlers = [
  PromptVoteCreatedEventHandler,
  PromptVoteChangedEventHandler,
];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers],
  exports: [],
})
export class PromptVoteModule {}
