import { ApiProperty } from '@nestjs/swagger';

export class UserSearchView {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly id: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  public readonly name: string;

  @ApiProperty({
    description: "The URL of the user's avatar",
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  public readonly avatarUrl?: string;

  constructor(id: string, name: string, avatarUrl?: string) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
  }
}
