import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPromptsByCatalogQueryDto {
  @ApiProperty({
    description: 'Number of prompts to take (for pagination)',
    default: 10,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  take?: number = 10;

  @ApiProperty({
    description: 'Number of prompts to skip (for pagination)',
    default: 0,
    required: false,
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  skip?: number = 0;

  @ApiProperty({
    description: 'Search term to filter prompts',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
