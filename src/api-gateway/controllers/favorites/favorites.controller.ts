import { Controller, Post, Param, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { FavoritesService } from '../../../favorites';
import { PromptIdParamDto } from '../../dtos';
import { AuthGuard } from '../../guards';
import { GetUserId } from '../../decorators';
import { SWAGGER_USER_AUTH } from '../../../shared';

@ApiTags('favorites')
@Controller('favorites')
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
}
