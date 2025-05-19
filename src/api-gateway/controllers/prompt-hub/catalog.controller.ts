import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PromptHubService } from '../../../prompt-hub';
import { CreateCatalogDto } from '../../dtos';
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
}
