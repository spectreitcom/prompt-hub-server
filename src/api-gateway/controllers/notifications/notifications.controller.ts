import {
  Controller,
  Get,
  Post,
  UseGuards,
  HttpStatus,
  Param,
} from '@nestjs/common';
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
import { NotificationIdParamDto } from '../../dtos';

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

  @Post(':id/read')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary: 'Mark notification as read',
    description:
      'Marks a specific notification as read for the authenticated user',
  })
  @ApiOkResponse({
    description: 'Notification marked as read successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Notification not found or does not belong to the user',
  })
  async markNotificationAsRead(
    @Param() params: NotificationIdParamDto,
    @GetUserId() userId: string,
  ): Promise<void> {
    return this.notificationsService.markNotificationAsRead(params.id, userId);
  }

  @Post('mark-all-read')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(SWAGGER_USER_AUTH)
  @ApiOperation({
    summary: 'Mark all notifications as read',
    description: 'Marks all notifications as read for the authenticated user',
  })
  @ApiOkResponse({
    description: 'All notifications marked as read successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async markAllNotificationsAsRead(@GetUserId() userId: string): Promise<void> {
    return this.notificationsService.markAllNotificationsAsRead(userId);
  }
}
