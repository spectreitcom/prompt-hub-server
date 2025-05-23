import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Delete,
  Patch,
  Get,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PromptHubService } from '../../../prompt-hub';
import {
  PromptCatalogView,
  PromptDetailsView,
  PromptListItemView,
  PromptCatalogItemView,
  EditablePromptView,
} from '../../../prompt-hub/views';
import {
  CreatePromptDto,
  PromptIdParamDto,
  UpdatePromptDto,
  SetPromptVisibilityDto,
  CatalogIdParamDto,
  GetUserPromptsQueryDto,
  GetPromptsByCatalogQueryDto,
} from '../../dtos';
import { AuthGuard } from '../../guards';
import { GetUserId } from '../../decorators';
import { SWAGGER_USER_AUTH } from '../../../shared';
import { UnauthorizedPromptAccessException } from '../../../prompt-hub';

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
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The ID of the created prompt',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async createPrompt(
    @Body() createPromptDto: CreatePromptDto,
    @GetUserId() userId: string,
  ): Promise<{ id: string }> {
    const promptId = await this.promptHubService.createPrompt(userId);
    return { id: promptId };
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

  @Post('prompts/:promptId/view')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Record that a prompt was viewed by a user' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt that was viewed',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prompt view recorded successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Prompt not found',
  })
  async viewPrompt(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.viewPrompt(params.promptId, userId);
  }

  @Post('prompts/:promptId/copy')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Record that a prompt was copied by a user' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt that was copied',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prompt copy recorded successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Prompt not found',
  })
  async copyPrompt(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.copyPrompt(params.promptId, userId);
  }

  @Get('catalogs')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary: 'Get a list of prompt catalogs for a specific user',
  })
  @ApiOkResponse({
    description: 'Prompt catalogs retrieved successfully',
    type: [PromptCatalogView],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async getUserPromptCatalogs(
    @GetUserId() userId: string,
  ): Promise<PromptCatalogView[]> {
    return this.promptHubService.getUserPromptCatalogs(userId);
  }

  @Get('catalogs/:catalogId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary: 'Get detailed information about a specific prompt catalog',
  })
  @ApiParam({
    name: 'catalogId',
    description: 'The unique identifier of the catalog',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Prompt catalog details retrieved successfully',
    type: PromptCatalogView,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Prompt catalog not found',
  })
  async getPromptCatalogById(
    @Param() params: CatalogIdParamDto,
    @GetUserId() userId: string,
  ): Promise<PromptCatalogView> {
    return this.promptHubService.getPromptCatalogById(params.catalogId, userId);
  }

  @Get('catalogs/:catalogId/prompts')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary:
      'Get a list of prompts for a specific catalog with pagination and optional search',
    description: 'Use page and limit parameters for pagination',
  })
  @ApiParam({
    name: 'catalogId',
    description: 'The unique identifier of the catalog',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'List of prompts retrieved successfully',
    type: [PromptCatalogItemView],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Catalog not found',
  })
  async getPromptsByCatalog(
    @Param() params: CatalogIdParamDto,
    @GetUserId() userId: string,
    @Query() query: GetPromptsByCatalogQueryDto,
  ): Promise<PromptCatalogItemView[]> {
    return this.promptHubService.getPromptsByCatalog(
      params.catalogId,
      query.skip,
      query.take,
      userId,
      query.search,
    );
  }

  @Get(':promptId')
  @ApiOperation({
    summary: 'Get detailed information about a specific prompt',
  })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Prompt details retrieved successfully',
    type: PromptDetailsView,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Prompt not found',
  })
  async getPromptDetails(
    @Param() params: PromptIdParamDto,
  ): Promise<PromptDetailsView> {
    return this.promptHubService.getPromptDetails(params.promptId);
  }

  @Get('user/prompts')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary:
      'Get a list of prompts for a specific user with pagination and optional search',
    description: 'Use page and limit parameters for pagination',
  })
  @ApiOkResponse({
    description: 'List of prompts retrieved successfully',
    type: [PromptListItemView],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async getUserPrompts(
    @GetUserId() userId: string,
    @Query() query: GetUserPromptsQueryDto,
  ): Promise<PromptListItemView[]> {
    return this.promptHubService.getUserPrompts(
      userId,
      query.take,
      query.skip,
      query.search,
    );
  }

  @Get('prompts/:promptId/edit')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary: 'Get prompt details for editing',
    description:
      'Retrieves the prompt details that can be edited by the user. This endpoint returns the complete prompt data including id, title, full content, current status (DRAFT or PUBLISHED), and visibility setting (public or private). Only the prompt owner can access this data.',
  })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to edit',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description:
      'Prompt details for editing retrieved successfully. Returns the prompt with its id, title, content, status, and visibility settings.',
    type: EditablePromptView,
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
    description: 'User not authorized to edit this prompt',
  })
  async getPromptForEdit(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<EditablePromptView> {
    try {
      return await this.promptHubService.getPromptForEdit(
        params.promptId,
        userId,
      );
    } catch (error) {
      if (error instanceof UnauthorizedPromptAccessException) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }
}
