import { ApiProperty } from '@nestjs/swagger';

export class PromptCatalogItemView {
  @ApiProperty({
    description: 'The unique identifier of the prompt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly promptId: string;

  @ApiProperty({
    description: 'The title of the prompt',
    example: 'My Awesome Prompt',
  })
  public readonly promptTitle: string;

  @ApiProperty({
    description: 'The unique identifier of the catalog',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly catalogId: string;

  @ApiProperty({
    description: 'The name of the catalog',
    example: 'My Favorite Prompts',
  })
  public readonly catalogName: string;

  @ApiProperty({
    description: 'The date and time when the prompt was added to the catalog',
    example: '2023-01-01T00:00:00.000Z',
  })
  public readonly addedAt: Date;

  constructor(
    promptId: string,
    promptTitle: string,
    catalogId: string,
    catalogName: string,
    addedAt: Date,
  ) {
    this.promptId = promptId;
    this.promptTitle = promptTitle;
    this.catalogId = catalogId;
    this.catalogName = catalogName;
    this.addedAt = addedAt;
  }
}
