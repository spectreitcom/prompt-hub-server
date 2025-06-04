import { ApiProperty } from '@nestjs/swagger';

export class AdminUserResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the admin user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The email address of the admin user',
    example: 'admin@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Indicates if the admin user has superuser privileges',
    example: true,
  })
  isSuperuser: boolean;

  @ApiProperty({
    description: 'Indicates if the admin user account is active',
    example: true,
  })
  isActive: boolean;
}