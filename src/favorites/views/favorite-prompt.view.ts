import { ApiProperty } from '@nestjs/swagger';

export class FavoritePromptView {
  @ApiProperty({
    description: 'The unique identifier of the prompt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly id: string;

  @ApiProperty({
    description: 'The title of the prompt',
    example: 'My Awesome Prompt',
  })
  public readonly title: string;

  @ApiProperty({
    description: 'The unique identifier of the author of the prompt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly authorId: string;

  @ApiProperty({
    description: 'The date and time when the prompt was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  public readonly createdAt: Date;

  constructor(id: string, title: string, authorId: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
    this.createdAt = createdAt;
  }
}
