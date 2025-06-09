import { ApiProperty } from '@nestjs/swagger';
import { TagEntryView } from '../../../tags';

export class GetAllTagsResponseDto {
  @ApiProperty({
    description: 'Array of tags',
    type: [TagEntryView],
  })
  data: TagEntryView[];

  @ApiProperty({
    description: 'Total number of tags',
    example: 100,
  })
  totalCount: number;
}
