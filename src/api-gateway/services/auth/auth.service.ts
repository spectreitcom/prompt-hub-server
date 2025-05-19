import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountsService } from '../../../accounts';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.googleClient = new OAuth2Client();
  }

  /**
   * Authenticates a user with Google
   * @param token Google ID token
   * @param response Express response object for setting cookies
   * @returns Authentication result with user data or error
   */
  async authenticateWithGoogle(token: string, response: Response) {
    try {
      // Verify the Google token
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.sub || !payload.email || !payload.name) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          data: {
            message: 'Invalid Google token',
          },
        };
      }

      // Check if user exists, if not create a new one
      const user = await this.accountsService.findByEmail(payload.email);
      if (!user) {
        await this.accountsService.signUpWithGmail(
          payload.sub,
          payload.email,
          payload.name,
          payload.picture,
        );
      }

      // Get the user (either existing or newly created)
      const authenticatedUser = await this.accountsService.findByEmail(
        payload.email,
      );
      if (!authenticatedUser) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          data: {
            message: 'Failed to authenticate user',
          },
        };
      }

      // Generate JWT token
      const jwtToken = this.jwtService.sign({
        sub: authenticatedUser.getId(),
        email: authenticatedUser.getEmail(),
      });

      // Set JWT token in cookie
      response.cookie('jwt', jwtToken, {
        httpOnly: true,
        secure: this.configService.get<string>('NODE_ENV') === 'production', // Use secure cookies in production
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 * 10, // 10 days
      });

      // Return success response
      return {
        status: HttpStatus.OK,
        data: {
          message: 'Authentication successful',
          user: {
            id: authenticatedUser.getId(),
            email: authenticatedUser.getEmail(),
            name: authenticatedUser.getName(),
            avatarUrl: authenticatedUser.getAvatarUrl(),
          },
        },
      };
    } catch (error) {
      console.error('Google authentication error:', error);
      return {
        status: HttpStatus.UNAUTHORIZED,
        data: {
          message: 'Authentication failed',
          error: (error as Error).message,
        },
      };
    }
  }
}
