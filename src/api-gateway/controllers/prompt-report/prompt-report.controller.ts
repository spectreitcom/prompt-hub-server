import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Get,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { PromptReportService } from '../../../prompt-report';
import { CreatePromptReportDto, PromptIdParamDto } from '../../dtos';
import { AuthGuard } from '../../guards';
import { GetUserId } from '../../decorators';
import { SWAGGER_USER_AUTH } from '../../../shared';

@ApiTags('prompt-reports')
@Controller('prompt-reports')
export class PromptReportController {
  constructor(private readonly promptReportService: PromptReportService) {}

  @Post('prompts/:promptId/report')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Report a prompt for inappropriate content' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to report',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Report submitted successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Prompt not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User has already reported this prompt',
  })
  async reportPrompt(
    @Param() params: PromptIdParamDto,
    @Body() createPromptReportDto: CreatePromptReportDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    // Check if user has already reported this prompt
    const hasReported = await this.promptReportService.hasUserReportedPrompt(
      params.promptId,
      userId,
    );

    if (hasReported) {
      throw new BadRequestException('User has already reported this prompt');
    }

    return this.promptReportService.createPromptReport(
      params.promptId,
      userId,
      createPromptReportDto.reason,
    );
  }

  @Get('prompts/:promptId/has-reported')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Check if the current user has reported a prompt' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to check',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Check completed successfully',
    schema: {
      type: 'object',
      properties: {
        hasReported: {
          type: 'boolean',
          description: 'Whether the user has reported the prompt',
          example: true,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Prompt not found',
  })
  async hasReportedPrompt(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<{ hasReported: boolean }> {
    const hasReported = await this.promptReportService.hasUserReportedPrompt(
      params.promptId,
      userId,
    );
    return { hasReported };
  }
}
