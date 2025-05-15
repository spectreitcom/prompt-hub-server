import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  PromptVoteCreatedEventHandler,
  PromptVoteChangedEventHandler,
  VotePromptCommandHandler,
} from './application';

const eventHandlers = [
  PromptVoteCreatedEventHandler,
  PromptVoteChangedEventHandler,
];

const commandHandlers = [VotePromptCommandHandler];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers],
  exports: [],
})
export class VotingModule {}
