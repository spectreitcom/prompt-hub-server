import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';

export class GetPromptListQueryDto {
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
    description: 'Search term to filter prompts',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    description: 'Tags to filter prompts (comma-separated string or array)',
    required: false,
    isArray: true,
    type: [String],
  })
  @IsOptional()
  @Type(() => String)
  @Transform((params: TransformFnParams) => {
    const { value, key, obj } = params;
    obj[key] = value;
    return Array.isArray(value) ? value : [value];
  })
  private 'tags[]'?: string[];

  // For backward compatibility
  get take(): number {
    return this.limit;
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  get tags() {
    return this['tags[]'];
  }
}
