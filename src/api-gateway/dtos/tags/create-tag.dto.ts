import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The value of the tag',
    example: 'javascript',
  })
  @IsNotEmpty({ message: 'Tag value is required' })
  @IsString({ message: 'Tag value must be a string' })
  @MaxLength(50, { message: 'Tag value must be at most 50 characters long' })
  readonly value: string;
}