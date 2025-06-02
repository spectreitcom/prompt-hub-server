import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetDailyStatsQueryDto {
  @ApiProperty({
    description: 'The start date for the statistics range',
    example: '2023-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({
    description: 'The end date for the statistics range',
    example: '2023-12-31',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  endDate?: Date;
}
