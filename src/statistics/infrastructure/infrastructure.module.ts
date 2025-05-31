import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PrismaPromptStatisticsViewRepository,
  PrismaPromptDailyStatsViewRepository,
} from './persistence';
import {
  PromptStatisticsViewRepository,
  PromptDailyStatsViewRepository,
} from '../application';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: PromptStatisticsViewRepository,
      useClass: PrismaPromptStatisticsViewRepository,
    },
    {
      provide: PromptDailyStatsViewRepository,
      useClass: PrismaPromptDailyStatsViewRepository,
    },
  ],
  exports: [PromptStatisticsViewRepository, PromptDailyStatsViewRepository],
})
export class InfrastructureModule {}
