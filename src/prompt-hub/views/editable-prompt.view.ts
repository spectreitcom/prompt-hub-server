import { PromptStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EditablePromptView {
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
    description: 'The full content of the prompt',
    example:
      'This is a detailed prompt that helps users accomplish a specific task...',
  })
  public readonly content: string;

  @ApiProperty({
    description: 'The current status of the prompt',
    enum: ['DRAFT', 'PUBLISHED'],
    example: 'DRAFT',
  })
  public readonly status: PromptStatus;

  @ApiProperty({
    description: 'Whether the prompt is publicly visible',
    example: false,
  })
  public readonly isPublic: boolean;

  @ApiProperty({
    description: "The prompt's tags",
    example: ['awesome', 'prompt', 'fun'],
  })
  public readonly tags: string[];

  constructor(
    id: string,
    title: string,
    content: string,
    status: PromptStatus,
    isPublic: boolean,
    tags: string[],
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.status = status;
    this.isPublic = isPublic;
    this.tags = tags;
  }
}
