import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { PromptHubService } from '../../../prompt-hub';
import {
  CreatePromptDto,
  PromptIdParamDto,
  UpdatePromptDto,
  SetPromptVisibilityDto,
} from '../../dtos';
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

  @Post('prompts/:promptId/publish')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Publish a prompt' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to publish',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prompt published successfully',
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
    status: HttpStatus.FORBIDDEN,
    description: 'User not authorized to publish this prompt',
  })
  async publishPrompt(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.publishPrompt(params.promptId, userId);
  }

  @Delete('prompts/:promptId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Remove a prompt' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to remove',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prompt removed successfully',
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
    status: HttpStatus.FORBIDDEN,
    description: 'User not authorized to remove this prompt',
  })
  async removePrompt(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.deletePrompt(params.promptId, userId);
  }

  @Patch('prompts/:promptId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Update prompt content' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to update',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prompt content updated successfully',
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
    status: HttpStatus.FORBIDDEN,
    description: 'User not authorized to update this prompt',
  })
  async updatePromptContent(
    @Param() params: PromptIdParamDto,
    @Body() updatePromptDto: UpdatePromptDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.updatePrompt(
      params.promptId,
      updatePromptDto.title,
      updatePromptDto.content,
      userId,
    );
  }

  @Patch('prompts/:promptId/visibility')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Set prompt visibility' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to update visibility',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prompt visibility updated successfully',
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
    status: HttpStatus.FORBIDDEN,
    description: 'User not authorized to update this prompt',
  })
  async setPromptVisibility(
    @Param() params: PromptIdParamDto,
    @Body() setPromptVisibilityDto: SetPromptVisibilityDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.setPromptVisibility(
      params.promptId,
      setPromptVisibilityDto.isPublic,
      userId,
    );
  }
}
