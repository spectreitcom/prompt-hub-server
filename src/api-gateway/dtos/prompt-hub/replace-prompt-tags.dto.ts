import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ReplacePromptTagsDto {
  @ApiProperty({
    description: 'Array of tags to replace the existing tags',
    example: ['tag1', 'tag2', 'tag3'],
    type: [String],
  })
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(50, { each: true })
  tags: string[];
}
