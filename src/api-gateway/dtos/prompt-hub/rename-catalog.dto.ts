import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for renaming a prompt catalog.
 */
export class RenameCatalogDto {
  @ApiProperty({
    description: 'The new name for the catalog',
    example: 'My Updated Catalog Name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
