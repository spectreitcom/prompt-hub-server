import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  HttpStatus,
  Get,
  Query,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { FavoritesService, FavoritePromptEntryView } from '../../../favorites';
import { PromptIdParamDto, GetFavoritePromptsQueryDto } from '../../dtos';
import { AuthGuard } from '../../guards';
import { GetUserId } from '../../decorators';
import { SWAGGER_USER_AUTH } from '../../../shared';
import { DomainExceptionsFilter } from '../../filters';

@ApiTags('favorites')
@Controller('favorites')
@UseFilters(DomainExceptionsFilter)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('prompts/:promptId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Add a prompt to favorites' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to add to favorites',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Prompt added to favorites successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Prompt not found',
  })
  async addPromptToFavorites(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.favoritesService.addPromptToFavorites(params.promptId, userId);
  }

  @Delete('prompts/:promptId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Remove a prompt from favorites' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to remove from favorites',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prompt removed from favorites successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Prompt not found or not in favorites',
  })
  async removePromptFromFavorites(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.favoritesService.removePromptFromFavorites(
      params.promptId,
      userId,
    );
  }

  @Get('prompts')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary:
      'Get a list of favorite prompts with pagination and optional filtering',
    description:
      'Use page and limit parameters for pagination. Returns prompts that the user has added to favorites.',
  })
  @ApiOkResponse({
    description: 'List of favorite prompts retrieved successfully',
    type: [FavoritePromptEntryView],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async getFavoritePrompts(
    @GetUserId() userId: string,
    @Query() query: GetFavoritePromptsQueryDto,
  ): Promise<FavoritePromptEntryView[]> {
    return this.favoritesService.getFavoritePrompts(
      userId,
      query.skip,
      query.take,
      query.search,
      query.authorId,
    );
  }

  @Get('prompts/:promptId/is-favorite')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Check if a prompt is in favorites' })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to check',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Returns true if the prompt is in favorites, false otherwise',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async isPromptInFavorites(
    @Param() params: PromptIdParamDto,
    @GetUserId() userId: string,
  ): Promise<boolean> {
    return this.favoritesService.isPromptInFavorites(params.promptId, userId);
  }
}
