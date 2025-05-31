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
  GetPromptStatsQueryHandler,
  GetDailyStatsQueryHandler,
} from './application';

const EventHandlers = [
  PromptCopiedEventHandler,
  PromptDeletedEventHandler,
  PromptViewedEventHandler,
  PromptVoteCreatedEventHandler,
  FavoritePromptCreatedEventHandler,
  PromptCreatedEventHandler,
];

const QueryHandlers = [GetPromptStatsQueryHandler, GetDailyStatsQueryHandler];

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...EventHandlers, ...QueryHandlers, StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
