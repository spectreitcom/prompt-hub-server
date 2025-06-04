import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Decorator to extract the adminUserId from the request object.
 * This decorator should be used with the AuthGuard to ensure the admin user is authenticated.
 *
 * @example
 * ```typescript
 * @Get('profile')
 * @UseGuards(AuthGuard)
 * getProfile(@GetAdminUserId() adminUserId: string) {
 *   return this.adminUsersService.getPublicAdminUserView(adminUserId);
 * }
 * ```
 */
export const GetAdminUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user || !request.user.id) {
      throw new UnauthorizedException('Admin user not authenticated');
    }

    return request.user.id;
  },
);
