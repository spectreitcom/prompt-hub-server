import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AdminUsersService } from '../../admin-users';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminUsersService: AdminUsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Verify that the admin user exists and is active
      const adminUser = await this.adminUsersService.findByEmail(payload.email);
      if (!adminUser || !adminUser.isActiveUser().getValue()) {
        throw new UnauthorizedException('Invalid or inactive admin user');
      }

      // Add admin user information to request object
      request.user = {
        id: adminUser.getId().getValue(),
        email: adminUser.getEmail().getValue(),
        isSuperuser: adminUser.isSuperUser().getValue(),
        isActive: adminUser.isActiveUser().getValue(),
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid authentication token');
    }
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
