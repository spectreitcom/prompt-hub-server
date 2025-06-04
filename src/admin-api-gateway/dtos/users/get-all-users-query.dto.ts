import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllUsersQueryDto {
  @ApiProperty({
    description: 'Number of users per page (for pagination)',
    default: 10,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  readonly limit?: number = 10;

  @ApiProperty({
    description: 'Page number (for pagination)',
    default: 1,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  readonly page?: number = 1;

  // For backward compatibility with the AccountsService
  get take(): number {
    return this.limit;
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
