import { ApiProperty } from '@nestjs/swagger';
import { UserProfileResponseDto } from './user-profile-response.dto';

export class GetAllUsersResponseDto {
  @ApiProperty({
    description: 'Array of user profiles',
    type: [UserProfileResponseDto],
  })
  readonly users: UserProfileResponseDto[];

  @ApiProperty({
    description: 'Total number of users in the system',
    example: 42,
  })
  readonly totalCount: number;
}
