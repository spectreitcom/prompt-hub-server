import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetDailyStatsQueryDto {
  @ApiProperty({
    description: 'The start date for the statistics range',
    example: '2023-01-01',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly startDate?: Date;

  @ApiProperty({
    description: 'The end date for the statistics range',
    example: '2023-12-31',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly endDate?: Date;
}
