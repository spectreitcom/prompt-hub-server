import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to extract the userId from the request object.
 * This decorator can be used without the AuthGuard as it returns undefined if the user is not authenticated.
 *
 * @example
 * ```typescript
 * @Get('view-prompt/:promptId')
 * viewPrompt(@Param() params: PromptIdParamDto, @GetOptionalUserId() userId?: string) {
 *   return this.promptHubService.viewPrompt(params.promptId, userId);
 * }
 * ```
 */
export const GetOptionalUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user || !request.user.id) {
      return undefined;
    }

    return request.user.id;
  },
);
