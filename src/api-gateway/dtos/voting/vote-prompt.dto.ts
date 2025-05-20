import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

/**
 * Type for vote values (UP for like, DOWN for dislike)
 */
export type VoteType = 'UP' | 'DOWN';

/**
 * Data Transfer Object for voting on a prompt.
 */
export class VotePromptDto {
  @ApiProperty({
    description: 'The type of vote (UP for like, DOWN for dislike)',
    enum: ['UP', 'DOWN'],
    example: 'UP',
  })
  @IsNotEmpty()
  @IsEnum(['UP', 'DOWN'])
  voteType: VoteType;
}
