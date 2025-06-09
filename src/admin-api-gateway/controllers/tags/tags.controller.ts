import {
  Controller,
  Get,
  Query,
  UseGuards,
  Delete,
  Param,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TagsService } from '../../../tags';
import { GetAllTagsQueryDto, GetAllTagsResponseDto } from '../../dtos';
import { AuthGuard } from '../../guards';
import { SWAGGER_ADMIN_AUTH } from '../../../shared';
import { TagNotFoundExceptionFilter } from '../../filters';

@ApiTags('admin/tags')
@Controller('admin/tags')
@UseGuards(AuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiBearerAuth(SWAGGER_ADMIN_AUTH)
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all tags with pagination information',
    type: GetAllTagsResponseDto,
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
  async getAllTags(
    @Query() query: GetAllTagsQueryDto,
  ): Promise<GetAllTagsResponseDto> {
    return this.tagsService.getAllTags(query.skip, query.take, query.search);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth(SWAGGER_ADMIN_AUTH)
  @ApiOperation({ summary: 'Remove a tag' })
  @ApiParam({ name: 'id', description: 'Tag ID', type: 'string' })
  @UseFilters(TagNotFoundExceptionFilter)
  @ApiResponse({
    status: 204,
    description: 'Tag successfully removed',
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
  @ApiResponse({
    status: 404,
    description: 'Tag not found.',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: "Tag with id '123' not found" },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async removeTag(@Param('id') id: string): Promise<void> {
    await this.tagsService.removeTag(id);
  }
}
