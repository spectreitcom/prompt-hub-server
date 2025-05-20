import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { NotificationsService } from '../../../notifications';
import { AuthGuard } from '../../guards';
import { SWAGGER_USER_AUTH } from '../../../shared';
import { GetUserId } from '../../decorators';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('unread-count')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary: 'Get the count of unread notifications',
    description:
      'Returns the number of unread notifications for the authenticated user',
  })
  @ApiOkResponse({
    description: 'Unread notification count retrieved successfully',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async getUnreadNotificationCount(
    @GetUserId() userId: string,
  ): Promise<number> {
    return this.notificationsService.getUnreadNotificationCount(userId);
  }
}
