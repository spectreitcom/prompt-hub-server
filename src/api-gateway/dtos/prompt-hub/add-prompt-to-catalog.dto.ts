import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for adding a prompt to a catalog.
 */
export class AddPromptToCatalogDto {
  @ApiProperty({
    description: 'The unique identifier of the prompt to add to the catalog',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  promptId: string;
}
