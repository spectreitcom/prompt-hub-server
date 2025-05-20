import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  Param,
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
  CreateCatalogDto,
  AddPromptToCatalogDto,
  CatalogIdParamDto,
  RemovePromptFromCatalogParamDto,
  RenameCatalogDto,
} from '../../dtos';
import { AuthGuard } from '../../guards';
import { GetUserId } from '../../decorators';
import { SWAGGER_USER_AUTH } from '../../../shared';

@ApiTags('prompt-hub-catalogs')
@Controller('prompt-hub/catalogs')
export class CatalogController {
  constructor(private readonly promptHubService: PromptHubService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Create a new catalog for prompts' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Catalog created successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async createCatalog(
    @Body() createCatalogDto: CreateCatalogDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.createPromptCatalog(
      userId,
      createCatalogDto.name,
    );
  }

  @Patch(':catalogId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Rename a catalog' })
  @ApiParam({
    name: 'catalogId',
    description: 'The unique identifier of the catalog to rename',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Catalog renamed successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Catalog not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User not authorized to rename this catalog',
  })
  async renameCatalog(
    @Param() params: CatalogIdParamDto,
    @Body() renameCatalogDto: RenameCatalogDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.renamePromptCatalog(
      params.catalogId,
      renameCatalogDto.name,
      userId,
    );
  }

  @Post(':catalogId/prompts')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Add a prompt to a catalog' })
  @ApiParam({
    name: 'catalogId',
    description: 'The unique identifier of the catalog',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prompt added to catalog successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Catalog or prompt not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User not authorized to add this prompt to the catalog',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Prompt is already in the catalog',
  })
  async addPromptToCatalog(
    @Param() params: CatalogIdParamDto,
    @Body() addPromptToCatalogDto: AddPromptToCatalogDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.addPromptToCatalog(
      params.catalogId,
      addPromptToCatalogDto.promptId,
      userId,
    );
  }

  @Delete(':catalogId/prompts/:promptId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Remove a prompt from a catalog' })
  @ApiParam({
    name: 'catalogId',
    description: 'The unique identifier of the catalog',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'promptId',
    description: 'The unique identifier of the prompt to remove',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prompt removed from catalog successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Catalog or prompt not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User not authorized to remove this prompt from the catalog',
  })
  async removePromptFromCatalog(
    @Param() params: RemovePromptFromCatalogParamDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.removePromptFromCatalog(
      params.catalogId,
      params.promptId,
      userId,
    );
  }

  @Delete(':catalogId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Remove an entire catalog' })
  @ApiParam({
    name: 'catalogId',
    description: 'The unique identifier of the catalog to remove',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Catalog removed successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Catalog not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User not authorized to remove this catalog',
  })
  async removeCatalog(
    @Param() params: CatalogIdParamDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.promptHubService.deletePromptCatalog(params.catalogId, userId);
  }
}
