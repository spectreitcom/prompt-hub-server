import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a prompt report.
 */
export class CreatePromptReportDto {
  @ApiProperty({
    description: 'The reason for reporting the prompt',
    example: 'This prompt contains inappropriate content',
  })
  @IsNotEmpty()
  @IsString()
  reason: string;
}
