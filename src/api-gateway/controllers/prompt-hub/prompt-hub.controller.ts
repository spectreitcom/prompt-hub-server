import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PromptHubService } from '../../../prompt-hub';
import { CreatePromptDto } from '../../dtos';
import { AuthGuard } from '../../guards';
import { GetUserId } from '../../decorators';
import { SWAGGER_USER_AUTH } from '../../../shared';

@ApiTags('prompt-hub')
@Controller('prompt-hub')
export class PromptHubController {
  constructor(private readonly promptHubService: PromptHubService) {}

  @Post('prompts')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Create a new prompt' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Prompt created successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async createPrompt(
    @Body() createPromptDto: CreatePromptDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.createPrompt(userId);
  }
}
