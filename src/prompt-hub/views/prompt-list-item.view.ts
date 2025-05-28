import { ApiProperty } from '@nestjs/swagger';
import { PromptUserPublicView } from './prompt-user-public.view';

export class PromptListItemView {
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
    description: 'A preview of the prompt content',
    example: 'This is a prompt that does something amazing...',
  })
  public readonly contentPreview: string;

  @ApiProperty({
    description: 'The number of likes the prompt has received',
    example: 42,
  })
  public readonly likedCount: number;

  @ApiProperty({
    description: 'The number of times the prompt has been copied',
    example: 10,
  })
  public readonly copiedCount: number;

  @ApiProperty({
    description: 'The number of times the prompt has been viewed',
    example: 100,
  })
  public readonly viewCount: number;

  @ApiProperty({
    description: 'The date and time when the prompt was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  public readonly createdAt: Date;

  @ApiProperty({
    description: 'Whether the prompt is public or private',
    example: true,
  })
  public readonly isPublic: boolean;

  @ApiProperty({
    description: 'The status of the prompt',
    example: 'PUBLISHED',
  })
  public readonly status: string;

  @ApiProperty({
    description: 'The author of the prompt',
    type: PromptUserPublicView,
  })
  public readonly author: PromptUserPublicView;

  @ApiProperty({
    description: 'The tags of the prompt',
    example: ['awesome', 'prompt', 'fun'],
  })
  public readonly tags: string[];

  constructor(
    id: string,
    title: string,
    contentPreview: string,
    likedCount: number,
    copiedCount: number,
    viewCount: number,
    createdAt: Date,
    isPublic: boolean,
    status: string,
    author: PromptUserPublicView,
    tags: string[],
  ) {
    this.id = id;
    this.title = title;
    this.contentPreview = contentPreview;
    this.likedCount = likedCount;
    this.copiedCount = copiedCount;
    this.viewCount = viewCount;
    this.createdAt = createdAt;
    this.isPublic = isPublic;
    this.status = status;
    this.author = author;
    this.tags = tags;
  }
}
