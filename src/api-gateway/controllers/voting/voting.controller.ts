import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Get,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { VotingService } from '../../../voting';
import { VotePromptDto, PromptIdParamDto } from '../../dtos';
import { AuthGuard } from '../../guards';
import { GetUserId } from '../../decorators';
import { SWAGGER_USER_AUTH } from '../../../shared';
import { DomainExceptionsFilter } from '../../filters';

@ApiTags('voting')
@Controller('voting')
@UseFilters(DomainExceptionsFilter)
export class VotingController {
  constructor(private readonly votingService: VotingService) {}

  @Post('prompts/:promptId/vote')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Vote on a prompt (like/dislike)' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to vote on',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vote recorded successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Prompt not found',
  })
  async votePrompt(
    @Param() params: PromptIdParamDto,
    @Body() votePromptDto: VotePromptDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.votingService.votePrompt(
      params.promptId,
      userId,
      votePromptDto.voteType,
    );
  }

  @Get('prompts/:promptId/vote-status')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Get the vote status for a prompt' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to get vote status for',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vote status retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        vote: {
          type: 'number',
          description:
            'Vote status (1 for upvote, -1 for downvote, 0 for no vote)',
          example: 1,
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
  async getPromptVoteStatus(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<{ vote: number }> {
    return this.votingService.getPromptVoteStatus(params.promptId, userId);
  }
}
