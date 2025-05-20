import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

/**
 * Data Transfer Object for setting a prompt's visibility.
 */
export class SetPromptVisibilityDto {
  @ApiProperty({
    description:
      'Whether the prompt should be public (true) or private (false)',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;
}
