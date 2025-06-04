import { ApiProperty } from '@nestjs/swagger';
import { AdminUserResponseDto } from './admin-user-response.dto';

class AuthenticationResponseDataDto {
  @ApiProperty({
    description: 'Message describing the authentication result',
    example: 'Authentication successful',
  })
  message: string;

  @ApiProperty({
    description: 'JWT access token for authenticated user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: false,
  })
  accessToken?: string;

  @ApiProperty({
    description: 'Admin user information',
    type: AdminUserResponseDto,
    required: false,
  })
  user?: AdminUserResponseDto;

  @ApiProperty({
    description: 'Error message in case of authentication failure',
    example: 'Invalid credentials',
    required: false,
  })
  error?: string;
}

export class AuthenticationResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 200,
  })
  status: number;

  @ApiProperty({
    description: 'Response data',
    type: AuthenticationResponseDataDto,
  })
  data: AuthenticationResponseDataDto;
}