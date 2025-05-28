import { ApiProperty } from '@nestjs/swagger';

export class TagEntryView {
  @ApiProperty({
    description: 'The unique identifier of the tag',
    example: '1',
  })
  public readonly id: string;

  @ApiProperty({
    description: 'The value of the tag',
    example: 'javascript',
  })
  public readonly value: string;

  @ApiProperty({
    description: 'Whether the tag is active',
    example: true,
  })
  public readonly isActive: boolean;

  @ApiProperty({
    description: 'The number of times the tag has been used',
    example: 120,
  })
  public readonly usageCount: number;

  constructor(
    id: string,
    value: string,
    isActive: boolean,
    usageCount: number,
  ) {
    this.id = id;
    this.value = value;
    this.isActive = isActive;
    this.usageCount = usageCount;
  }
}
