import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  StatisticsService,
  PromptCopiedEventHandler,
  PromptDeletedEventHandler,
  PromptViewedEventHandler,
  PromptVoteCreatedEventHandler,
  FavoritePromptCreatedEventHandler,
  PromptCreatedEventHandler,
} from './application';

const EventHandlers = [
  PromptCopiedEventHandler,
  PromptDeletedEventHandler,
  PromptViewedEventHandler,
  PromptVoteCreatedEventHandler,
  FavoritePromptCreatedEventHandler,
  PromptCreatedEventHandler,
];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...EventHandlers, StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
