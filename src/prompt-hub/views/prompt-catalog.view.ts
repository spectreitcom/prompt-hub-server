import { ApiProperty } from '@nestjs/swagger';

export class PromptCatalogView {
  @ApiProperty({
    description: 'The unique identifier of the catalog',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly id: string;

  @ApiProperty({
    description: 'The name of the catalog',
    example: 'My Favorite Prompts',
  })
  public readonly name: string;

  @ApiProperty({
    description: 'The unique identifier of the user who owns the catalog',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly userId: string;

  @ApiProperty({
    description: 'The date and time when the catalog was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  public readonly createdAt: Date;

  constructor(id: string, name: string, userId: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}
