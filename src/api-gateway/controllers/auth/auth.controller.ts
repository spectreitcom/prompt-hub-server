import {
  Controller,
  Post,
  Body,
  Res,
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
import { Response } from 'express';
import { GoogleAuthDto } from '../../dtos';
import { AuthService } from '../../services';
import { AuthGuard } from '../../guards';
import { GetUserId } from '../../decorators';
import { AccountsService } from '../../../accounts';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountsService: AccountsService,
  ) {}

  @Post('google')
  @ApiOperation({ summary: 'Authenticate with Google' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully authenticated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async googleAuth(
    @Body() googleAuthDto: GoogleAuthDto,
    @Res() response: Response,
  ) {
    const result = await this.authService.authenticateWithGoogle(
      googleAuthDto.token,
      response,
    );
    response.status(result.status).json(result.data);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the current user profile',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async getCurrentUser(@GetUserId() userId: string) {
    return this.accountsService.getPublicUserView(userId);
  }
}
