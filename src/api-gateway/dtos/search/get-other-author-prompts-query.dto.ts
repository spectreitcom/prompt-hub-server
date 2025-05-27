import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { TransformFnParams } from 'class-transformer';

export class GetOtherAuthorPromptsQueryDto {
  @ApiProperty({
    description: 'ID of the author whose prompts to retrieve',
    required: true,
  })
  @IsString()
  authorId: string;

  @ApiProperty({
    description: 'Number of prompts per page (for pagination)',
    default: 10,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({
    description: 'Page number (for pagination)',
    default: 1,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: 'Array of prompt IDs to exclude from the results',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsString({ each: true })
  @Transform((params: TransformFnParams) => {
    const { value, key, obj } = params;
    obj[key] = value;
    return Array.isArray(value) ? value : [value];
  })
  'excludedPromptIds[]'?: string[];

  // For backward compatibility
  get take(): number {
    return this.limit;
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  get excludedPromptIds() {
    return this['excludedPromptIds[]'];
  }
}
