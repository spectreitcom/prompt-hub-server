import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Decorator to extract the userId from the request object.
 * This decorator should be used with the AuthGuard to ensure the user is authenticated.
 *
 * @example
 * ```typescript
 * @Get('profile')
 * @UseGuards(AuthGuard)
 * getProfile(@GetUserId() userId: string) {
 *   return this.userService.getProfile(userId);
 * }
 * ```
 */
export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user || !request.user.id) {
      throw new UnauthorizedException('User not authenticated');
    }

    return request.user.id;
  },
);
