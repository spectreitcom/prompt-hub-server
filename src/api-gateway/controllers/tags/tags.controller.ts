import { Controller, Post, Body, Get, Query, UseGuards, UseFilters } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { TagsService, TagEntryView } from '../../../tags';
import { CreateTagDto, GetPopularTagsQueryDto } from '../../dtos';
import { AuthGuard, OptionalAuthGuard } from '../../guards';
import { SWAGGER_USER_AUTH } from '../../../shared';
import { DomainExceptionsFilter } from '../../filters';

@ApiTags('tags')
@Controller('tags')
@UseFilters(DomainExceptionsFilter)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created.',
    type: TagEntryView,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Tag value is required', 'Tag value must be a string'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  async createTag(@Body() createTagDto: CreateTagDto): Promise<TagEntryView> {
    return this.tagsService.createTag(createTagDto.value);
  }

  @Get('popular')
  @UseGuards(OptionalAuthGuard)
  @ApiOperation({ summary: 'Get popular tags' })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Only returned if an invalid authentication token is provided.',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @ApiOkResponse({
    description: 'Returns a list of popular tags.',
    type: [TagEntryView],
  })
  async getPopularTags(
    @Query() query: GetPopularTagsQueryDto,
  ): Promise<TagEntryView[]> {
    return this.tagsService.getPopularTags(
      query.skip,
      query.take,
      query.search,
    );
  }
}
