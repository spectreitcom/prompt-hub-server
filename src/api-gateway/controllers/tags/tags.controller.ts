import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { TagsService } from '../../../tags';
import { TagEntryView } from '../../../tags/views';
import { CreateTagDto, GetPopularTagsQueryDto } from '../../dtos';
import { AuthGuard, OptionalAuthGuard } from '../../guards';
import { SWAGGER_USER_AUTH } from '../../../shared';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createTag(@Body() createTagDto: CreateTagDto): Promise<void> {
    return this.tagsService.createTag(createTagDto.value);
  }

  @Get('popular')
  @UseGuards(OptionalAuthGuard)
  @ApiOperation({ summary: 'Get popular tags' })
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
