import { ApiProperty } from '@nestjs/swagger';

export class PromptVoteEntryView {
  @ApiProperty({
    description: 'The unique identifier of the user who voted',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly userId: string;

  @ApiProperty({
    description: 'The unique identifier of the prompt that was voted on',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly promptId: string;

  @ApiProperty({
    description: 'The vote value (1 for upvote, -1 for downvote)',
    example: 1,
  })
  public readonly vote: number;

  @ApiProperty({
    description: 'The date and time when the vote was cast',
    example: '2023-01-01T00:00:00.000Z',
  })
  public readonly votedAt: Date;

  constructor(userId: string, promptId: string, vote: number, votedAt: Date) {
    this.userId = userId;
    this.promptId = promptId;
    this.vote = vote;
    this.votedAt = votedAt;
  }
}
