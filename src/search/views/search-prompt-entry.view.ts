import { ApiProperty } from '@nestjs/swagger';
import { UserSearchView } from './user-search.view';

export class SearchPromptEntryView {
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
    description: 'The content of the prompt',
    example: 'This is a prompt that does something amazing...',
  })
  public readonly content: string;

  @ApiProperty({
    description: 'The author of the prompt',
    type: UserSearchView,
  })
  public readonly author: UserSearchView;

  @ApiProperty({
    description: 'Whether the prompt is public or private',
    example: true,
  })
  public readonly isPublic: boolean;

  @ApiProperty({
    description: 'The status of the prompt (e.g., DRAFT, PUBLISHED)',
    example: 'PUBLISHED',
  })
  public readonly status: string;

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
    description: 'The number of likes the prompt has received',
    example: 42,
  })
  public readonly likedCount: number;

  @ApiProperty({
    description: 'The date and time when the prompt was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  public readonly createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the prompt was last updated',
    example: '2023-01-02T00:00:00.000Z',
  })
  public readonly updatedAt: Date;

  @ApiProperty({
    description: 'The tags of the prompt',
    example: ['tag1', 'tag2', 'tag3'],
  })
  public readonly tags: string[];

  constructor(
    id: string,
    title: string,
    content: string,
    author: UserSearchView,
    isPublic: boolean,
    status: string,
    copiedCount: number,
    viewCount: number,
    likedCount: number,
    createdAt: Date,
    updatedAt: Date,
    tags: string[] = [],
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.isPublic = isPublic;
    this.status = status;
    this.copiedCount = copiedCount;
    this.viewCount = viewCount;
    this.likedCount = likedCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.tags = tags;
  }
}
