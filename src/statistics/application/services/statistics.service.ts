import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPromptStatsQuery } from '../queries';
import { PromptStatisticsView } from '../../views';

@Injectable()
export class StatisticsService {
  constructor(private readonly queryBus: QueryBus) {}

  async getPromptStats(
    promptId: string,
    userId: string,
  ): Promise<PromptStatisticsView> {
    return this.queryBus.execute(new GetPromptStatsQuery(promptId, userId));
  }
}
