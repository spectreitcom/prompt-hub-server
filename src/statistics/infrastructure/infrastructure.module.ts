import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PrismaPromptStatisticsViewRepository,
  PrismaPromptDailyStatsViewRepository,
  PrismaPromptStatisticsAuthorViewRepository,
} from './persistence';
import {
  PromptStatisticsViewRepository,
  PromptDailyStatsViewRepository,
  PromptStatisticsAuthorViewRepository,
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
    {
      provide: PromptStatisticsAuthorViewRepository,
      useClass: PrismaPromptStatisticsAuthorViewRepository,
    },
  ],
  exports: [
    PromptStatisticsViewRepository,
    PromptDailyStatsViewRepository,
    PromptStatisticsAuthorViewRepository,
  ],
})
export class InfrastructureModule {}
