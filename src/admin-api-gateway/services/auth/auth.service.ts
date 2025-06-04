import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';
import { AdminUsersService, AdminUser } from '../../../admin-users';
import * as bcrypt from 'bcryptjs';

export interface AuthenticationResponse {
  status: number;
  data: {
    message: string;
    accessToken?: string;
    user?: {
      id: string;
      email: string;
      isSuperuser: boolean;
      isActive: boolean;
    };
    error?: string;
  };
}

export interface LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private readonly ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Invalid credentials',
    AUTHENTICATION_FAILED: 'Authentication failed',
    INTERNAL_ERROR: 'Internal error during authentication',
  };

  constructor(
    private readonly adminUsersService: AdminUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthenticationResponse> {
    try {
      const { email, password } = loginDto;
      const adminUser = await this.adminUsersService.findByEmail(email);

      if (!adminUser || !adminUser.isActiveUser().getValue()) {
        throw new UnauthorizedException(
          this.ERROR_MESSAGES.INVALID_CREDENTIALS,
        );
      }

      // Verify the password using the PasswordHash value object's comparePassword method
      const passwordHash = adminUser.getPasswordHash().getValue();
      const isPasswordValid = bcrypt.compare(password, passwordHash);

      if (!isPasswordValid) {
        throw new UnauthorizedException(
          this.ERROR_MESSAGES.INVALID_CREDENTIALS,
        );
      }

      const jwtToken = this.generateJwtToken(adminUser);

      return this.createSuccessResponse(adminUser, jwtToken);
    } catch (error) {
      return this.createErrorResponse(error as Error);
    }
  }

  private generateJwtToken(adminUser: AdminUser): string {
    return this.jwtService.sign({
      sub: adminUser.getId().getValue(),
      email: adminUser.getEmail().getValue(),
    });
  }

  private createSuccessResponse(
    adminUser: any,
    jwtToken: string,
  ): AuthenticationResponse {
    return {
      status: HttpStatus.OK,
      data: {
        message: 'Authentication successful',
        accessToken: jwtToken,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          isSuperuser: adminUser.isSuperuser,
          isActive: adminUser.isActive,
        },
      },
    };
  }

  private createErrorResponse(error: Error): AuthenticationResponse {
    console.error('Authentication error:', error);
    return {
      status: HttpStatus.UNAUTHORIZED,
      data: {
        message: this.ERROR_MESSAGES.AUTHENTICATION_FAILED,
        error: error.message,
      },
    };
  }

  async getPublicAdminUser(adminUserId: string) {
    const adminUser =
      await this.adminUsersService.getPublicAdminUserView(adminUserId);
    if (!adminUser) {
      throw new UnauthorizedException(this.ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    return adminUser;
  }
}
