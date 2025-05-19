import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a new prompt catalog.
 */
export class CreateCatalogDto {
  @ApiProperty({
    description: 'The name of the catalog',
    example: 'My Favorite Prompts',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
