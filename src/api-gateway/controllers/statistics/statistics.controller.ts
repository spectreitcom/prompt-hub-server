import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { StatisticsService } from '../../../statistics';
import {
  PromptStatisticsView,
  PromptDailyStatsView,
} from '../../../statistics/views';
import { PromptIdParamDto, GetDailyStatsQueryDto } from '../../dtos';
import { AuthGuard } from '../../guards';
import { GetUserId } from '../../decorators';
import { SWAGGER_USER_AUTH } from '../../../shared';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('prompt/:promptId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Get prompt statistics' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Prompt statistics retrieved successfully',
    type: PromptStatisticsView,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Prompt not found' })
  async getPromptStats(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<PromptStatisticsView> {
    return this.statisticsService.getPromptStats(params.promptId, userId);
  }

  @Get('prompt/:promptId/daily')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Get daily prompt statistics' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt',
    type: String,
  })
  @ApiOkResponse({
    description: 'Daily prompt statistics retrieved successfully',
    type: [PromptDailyStatsView],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Prompt not found' })
  async getDailyStats(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
    @Query() query: GetDailyStatsQueryDto,
  ): Promise<PromptDailyStatsView[]> {
    return this.statisticsService.getDailyStats(
      params.promptId,
      userId,
      query.startDate,
      query.endDate,
    );
  }
}
