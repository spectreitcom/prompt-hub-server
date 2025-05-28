import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPopularTagsQueryDto {
  @ApiProperty({
    description: 'Number of items to skip for pagination',
    example: 0,
    default: 0,
  })
  @IsInt({ message: 'Skip must be an integer' })
  @Min(0, { message: 'Skip must be at least 0' })
  @Type(() => Number)
  readonly skip: number = 0;

  @ApiProperty({
    description: 'Number of items to take for pagination',
    example: 10,
    default: 10,
  })
  @IsInt({ message: 'Take must be an integer' })
  @Min(1, { message: 'Take must be at least 1' })
  @Max(100, { message: 'Take must be at most 100' })
  @Type(() => Number)
  readonly take: number = 10;

  @ApiPropertyOptional({
    description: 'Optional search term to filter tags',
    example: 'java',
  })
  @IsOptional()
  @IsString({ message: 'Search must be a string' })
  readonly search?: string;
}
