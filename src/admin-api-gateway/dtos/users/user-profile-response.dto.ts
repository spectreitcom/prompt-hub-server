import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly id: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  readonly name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: "The URL of the user's avatar image",
    example: 'https://example.com/avatars/johndoe.jpg',
    required: false,
  })
  readonly avatarUrl?: string;
}
