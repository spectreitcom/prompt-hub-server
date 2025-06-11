import {
  Controller,
  Get,
  Query,
  UseGuards,
  Param,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AccountsService } from '../../../accounts';
import { AuthGuard } from '../../guards';
import {
  GetAllUsersQueryDto,
  GetAllUsersResponseDto,
  UserProfileResponseDto,
  GetUserByIdParamDto,
} from '../../dtos';
import { SWAGGER_ADMIN_AUTH } from '../../../shared';
import { DomainExceptionsFilter } from '../../filters';

@ApiTags('admin/users')
@Controller('admin/users')
@UseGuards(AuthGuard)
@UseFilters(DomainExceptionsFilter)
export class UsersController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_ADMIN_AUTH)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of users with pagination information',
    type: GetAllUsersResponseDto,
  })
  async getAllUsers(
    @Query() query: GetAllUsersQueryDto,
  ): Promise<GetAllUsersResponseDto> {
    return this.accountsService.getAllUsers(query.skip, query.take);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_ADMIN_AUTH)
  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to retrieve',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the details of the user',
    type: UserProfileResponseDto,
  })
  async getUserDetails(
    @Param() params: GetUserByIdParamDto,
  ): Promise<UserProfileResponseDto> {
    return this.accountsService.getPublicUserView(params.id);
  }
}
