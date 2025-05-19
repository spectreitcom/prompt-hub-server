import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for prompt ID parameter in URL.
 */
export class PromptIdParamDto {
  @ApiProperty({
    description: 'The unique identifier of the prompt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  promptId: string;
}