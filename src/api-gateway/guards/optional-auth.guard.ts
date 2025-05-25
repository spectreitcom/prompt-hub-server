import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

/**
 * Guard that makes authentication optional.
 * If a valid token is provided, it populates the request.user object.
 * If no token is provided or the token is invalid, it allows the request to proceed without authentication.
 *
 * This guard is designed to work with the GetOptionalUserId decorator.
 *
 * @example
 * ```typescript
 * @Get('view-prompt/:promptId')
 * @UseGuards(OptionalAuthGuard)
 * viewPrompt(@Param() params: PromptIdParamDto, @GetOptionalUserId() userId?: string) {
 *   return this.promptHubService.viewPrompt(params.promptId, userId);
 * }
 * ```
 */
@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    // If no token is provided, allow the request to proceed without authentication
    if (!token) {
      return true;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Add user information to request object
      request.user = {
        id: payload.sub,
        email: payload.email,
      };
    } catch {
      // If token verification fails, allow the request to proceed without authentication
      // The GetOptionalUserId decorator will return undefined in this case
    }

    // Always return true to allow the request to proceed
    return true;
  }

  private extractToken(request: Request): string | undefined {
    // First try to get token from Authorization header
    const authHeader = request.headers.authorization;
    if (authHeader) {
      // Extract token from "Bearer <token>" format
      const bearerToken = authHeader.match(/^Bearer\s+(\S+)$/);
      if (bearerToken) {
        return bearerToken[1];
      }
    }

    return undefined;
  }
}
