import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import { StatisticsService } from './application';

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
