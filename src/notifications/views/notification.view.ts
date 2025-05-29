import { ApiProperty } from '@nestjs/swagger';

export class NotificationView {
  @ApiProperty({
    description: 'The unique identifier of the notification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly id: string;

  @ApiProperty({
    description:
      'The type of the notification (e.g., PROMPT_LIKED, PROMPT_COPIED)',
    example: 'PROMPT_LIKED',
  })
  public readonly type: string;

  @ApiProperty({
    description: 'Additional data related to the notification',
    example: {
      title: 'some title',
      content: 'some optional content',
    },
  })
  public readonly payload: Record<string, any>;

  @ApiProperty({
    description: 'Whether the notification has been read by the user',
    example: false,
  })
  public readonly isRead: boolean;

  @ApiProperty({
    description: 'The date and time when the notification was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  public readonly createdAt: Date;

  constructor(
    id: string,
    type: string,
    payload: Record<string, any>,
    isRead: boolean,
    createdAt: Date,
  ) {
    this.id = id;
    this.type = type;
    this.payload = payload;
    this.isRead = isRead;
    this.createdAt = createdAt;
  }
}
