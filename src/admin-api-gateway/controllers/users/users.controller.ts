import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccountsService } from '../../../accounts';
import { AuthGuard } from '../../guards';
import { GetAllUsersQueryDto, GetAllUsersResponseDto } from '../../dtos';

@ApiTags('admin/users')
@Controller('admin/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns a list of users with pagination information',
    type: GetAllUsersResponseDto
  })
  async getAllUsers(@Query() query: GetAllUsersQueryDto): Promise<GetAllUsersResponseDto> {
    return this.accountsService.getAllUsers(query.skip, query.take);
  }
}
