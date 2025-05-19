import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { GoogleAuthDto } from '../../dtos';
import { AuthService } from '../../services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
