import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllTagsQueryDto {
  @ApiProperty({
    description: 'Number of items to skip for pagination',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  skip?: number = 0;

  @ApiProperty({
    description: 'Number of items to take for pagination',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  take?: number = 10;

  @ApiProperty({
    description: 'Search term to filter tags',
    example: 'javascript',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
