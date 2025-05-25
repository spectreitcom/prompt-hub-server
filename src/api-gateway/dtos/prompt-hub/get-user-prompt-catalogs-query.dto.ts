import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserPromptCatalogsQueryDto {
  @ApiProperty({
    description: 'Number of catalogs per page (for pagination)',
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
    description: 'Search term to filter catalogs',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;

  // For backward compatibility
  get take(): number {
    return this.limit;
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
