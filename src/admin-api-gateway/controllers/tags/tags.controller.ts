import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TagsService } from '../../../tags';
import { GetAllTagsQueryDto, GetAllTagsResponseDto } from '../../dtos';
import { AuthGuard } from '../../guards';
import { SWAGGER_ADMIN_AUTH } from '../../../shared';

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
}
