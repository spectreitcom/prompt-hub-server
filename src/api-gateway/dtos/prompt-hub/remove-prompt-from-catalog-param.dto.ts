import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for parameters when removing a prompt from a catalog.
 */
export class RemovePromptFromCatalogParamDto {
  @ApiProperty({
    description: 'The unique identifier of the catalog',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  catalogId: string;

  @ApiProperty({
    description: 'The unique identifier of the prompt to remove',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  promptId: string;
}
