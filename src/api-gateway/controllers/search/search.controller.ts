import { Controller, Get, Query, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SearchService } from '../../../search';
import { SearchPromptEntryView } from '../../../search/views';
import {
  GetPromptListQueryDto,
  GetOtherAuthorPromptsQueryDto,
} from '../../dtos';
import { AuthGuard } from '../../guards';
import { SWAGGER_USER_AUTH } from '../../../shared';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('prompts')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary: 'Get a list of prompts with pagination and optional search',
    description: 'Use page and limit parameters for pagination',
  })
  @ApiOkResponse({
    description: 'List of prompts retrieved successfully',
    type: [SearchPromptEntryView],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async getPromptList(
    @Query() query: GetPromptListQueryDto,
  ): Promise<SearchPromptEntryView[]> {
    return this.searchService.getPromptList(
      query.skip,
      query.take,
      query.search,
    );
  }

  @Get('author-prompts')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary: 'Get a list of prompts by a specific author',
    description:
      'Use authorId, page, limit, and optional excludedPromptIds parameters',
  })
  @ApiOkResponse({
    description: 'List of author prompts retrieved successfully',
    type: [SearchPromptEntryView],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async getOtherAuthorPrompts(
    @Query() query: GetOtherAuthorPromptsQueryDto,
  ): Promise<SearchPromptEntryView[]> {
    return this.searchService.getOtherAuthorPrompts(
      query.authorId,
      query.skip,
      query.take,
      query.excludedPromptIds,
    );
  }
}
