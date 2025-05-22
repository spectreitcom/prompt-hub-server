import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountsService, User } from '../../../accounts';

export interface AuthenticationResponse {
  status: number;
  data: {
    message: string;
    accessToken?: string;
    user?: {
      id: string;
      email: string;
      name: string;
      avatarUrl?: string;
    };
    error?: string;
  };
}

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;
  private readonly ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Invalid credentials',
    AUTHENTICATION_FAILED: 'Authentication failed',
    INTERNAL_ERROR: 'Internal error during authentication',
  };

  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.googleClient = this.initializeGoogleClient();
  }

  private initializeGoogleClient(): OAuth2Client {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    return new OAuth2Client(clientId, clientSecret);
  }

  async authenticateWithGoogle(token: string): Promise<AuthenticationResponse> {
    try {
      const payload = await this.verifyGoogleToken(token);
      const authenticatedUser = await this.getAuthenticatedUser(payload.email);
      const jwtToken = this.generateJwtToken(authenticatedUser);

      return this.createSuccessResponse(authenticatedUser, jwtToken);
    } catch (error) {
      return this.createErrorResponse(error as Error);
    }
  }

  private async verifyGoogleToken(token: string) {
    const ticket = await this.googleClient.verifyIdToken({ idToken: token });
    const payload = ticket.getPayload();

    if (!payload?.sub || !payload?.email || !payload?.name) {
      throw new UnauthorizedException(this.ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return payload;
  }

  private async getAuthenticatedUser(email: string) {
    const user = await this.accountsService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(this.ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    return user;
  }

  private generateJwtToken(user: User) {
    return this.jwtService.sign({
      sub: user.getId(),
      email: user.getEmail(),
    });
  }

  private createSuccessResponse(
    user: User,
    jwtToken: string,
  ): AuthenticationResponse {
    return {
      status: HttpStatus.OK,
      data: {
        message: 'Authentication successful',
        accessToken: jwtToken,
        user: {
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          avatarUrl: user.getAvatarUrl(),
        },
      },
    };
  }

  private createErrorResponse(error: Error): AuthenticationResponse {
    console.error('Google authentication error:', error);
    return {
      status: HttpStatus.UNAUTHORIZED,
      data: {
        message: this.ERROR_MESSAGES.AUTHENTICATION_FAILED,
        error: error.message,
      },
    };
  }
}
