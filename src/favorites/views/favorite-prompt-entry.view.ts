import { ApiProperty } from '@nestjs/swagger';
import { FavoriteUserPublicView } from './favorite-user-public.view';

export class FavoritePromptEntryView {
  @ApiProperty({
    description: 'The unique identifier of the prompt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly promptId: string;

  @ApiProperty({
    description: 'The title of the prompt',
    example: 'My Awesome Prompt',
  })
  public readonly title: string;

  @ApiProperty({
    description: 'The author of the prompt',
    type: FavoriteUserPublicView,
  })
  public readonly author: FavoriteUserPublicView;

  @ApiProperty({
    description: 'The unique identifier of the user who favorited the prompt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly userId: string;

  constructor(
    promptId: string,
    title: string,
    author: FavoriteUserPublicView,
    userId: string,
  ) {
    this.promptId = promptId;
    this.title = title;
    this.author = author;
    this.userId = userId;
  }
}
