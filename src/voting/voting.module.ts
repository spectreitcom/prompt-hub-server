import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  PromptVoteCreatedEventHandler,
  PromptVoteChangedEventHandler,
  VotePromptCommandHandler,
  GetPromptVoteStatusQueryHandler,
} from './application';

const eventHandlers = [
  PromptVoteCreatedEventHandler,
  PromptVoteChangedEventHandler,
];

const commandHandlers = [VotePromptCommandHandler];

const queryHandlers = [GetPromptVoteStatusQueryHandler];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers, ...queryHandlers],
  exports: [],
})
export class VotingModule {}
