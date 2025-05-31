import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPromptStatsQuery, GetDailyStatsQuery } from '../queries';
import { PromptStatisticsView } from '../../views';
import { PromptDailyStatsView } from '../../views';

@Injectable()
export class StatisticsService {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * Retrieves statistical information about a specific prompt for a given user.
   *
   * @param {string} promptId - The unique identifier of the prompt.
   * @param {string} userId - The unique identifier of the user requesting the statistics.
   * @return {Promise<PromptStatisticsView>} A promise that resolves to an object containing the prompt statistics.
   */
  async getPromptStats(
    promptId: string,
    userId: string,
  ): Promise<PromptStatisticsView> {
    return this.queryBus.execute(new GetPromptStatsQuery(promptId, userId));
  }

  /**
   * Retrieves daily statistics for a specific prompt and user within an optional date range.
   *
   * @param {string} promptId - The unique identifier of the prompt for which statistics are retrieved.
   * @param {string} userId - The unique identifier of the user for whom statistics are retrieved.
   * @param {Date} [startDate] - The optional start date of the date range for the statistics.
   * @param {Date} [endDate] - The optional end date of the date range for the statistics.
   * @return {Promise<PromptDailyStatsView[]>} A promise that resolves to an array of daily statistics views.
   */
  async getDailyStats(
    promptId: string,
    userId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<PromptDailyStatsView[]> {
    return this.queryBus.execute(
      new GetDailyStatsQuery(promptId, userId, startDate, endDate),
    );
  }
}
