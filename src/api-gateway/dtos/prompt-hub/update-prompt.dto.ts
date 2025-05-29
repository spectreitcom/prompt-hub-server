import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object for updating a prompt's content.
 */
export class UpdatePromptDto {
  @ApiProperty({
    description: 'The title of the prompt',
    example: 'My Awesome Prompt',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the prompt',
    example: 'This is a sample prompt content with instructions and examples.',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Additional instructions for using the prompt',
    example: 'Use this prompt when you need to generate creative content.',
    required: false,
  })
  @IsOptional()
  @IsString()
  instruction?: string;
}
