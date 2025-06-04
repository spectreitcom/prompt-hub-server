import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginDto } from '../../dtos';
import { AuthService, AuthenticationResponse } from '../../services';
import { AuthGuard } from '../../guards';
import { GetAdminUserId } from '../../decorators';

@ApiTags('admin/auth')
@Controller('admin/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login as admin user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully authenticated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<AuthenticationResponse> {
    return await this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current admin user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the current admin user profile',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Admin user not authenticated',
  })
  async getCurrentUser(@GetAdminUserId() adminUserId: string) {
    return this.authService.getPublicAdminUser(adminUserId);
  }
}