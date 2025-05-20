import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for notification ID parameter in URL.
 */
export class NotificationIdParamDto {
  @ApiProperty({
    description: 'The unique identifier of the notification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
