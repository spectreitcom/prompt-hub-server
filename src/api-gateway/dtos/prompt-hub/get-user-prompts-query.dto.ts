import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserPromptsQueryDto {
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
    description: 'Catalog ID to filter out prompts that are already in the catalog',
    required: false,
  })
  @IsString()
  @IsOptional()
  catalogId?: string;

  // For backward compatibility
  get take(): number {
    return this.limit;
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
