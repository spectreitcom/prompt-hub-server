import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpWithGmailCommand } from '../commands';
import { UserRepository } from '../ports';
import { EmailAddress } from '../../domain';

@Injectable()
export class AccountsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Registers a new user using their Gmail account information.
   *
   * @param {string} googleId - The unique identifier associated with the user's Google account.
   * @param {string} email - The email address associated with the user's Google account.
   * @param {string} name - The name of the user as provided in their Google account.
   * @param {string} [avatarUrl] - The optional URL to the user's profile picture from their Google account.
   * @return {Promise<void>} A promise that resolves when the sign-up process is completed.
   */
  async signUpWithGmail(
    googleId: string,
    email: string,
    name: string,
    avatarUrl?: string,
  ): Promise<void> {
    const command = new SignUpWithGmailCommand(
      googleId,
      email,
      name,
      avatarUrl,
    );

    await this.commandBus.execute(command);
  }

  /**
   * Finds a user by their email address.
   *
   * @param {string} email - The email address of the user to find.
   * @return {Promise<Object|null>} A promise that resolves to the user object if found, or null if no user is found.
   */
  async findByEmail(email: string) {
    return this.userRepository.findByEmail(EmailAddress.create(email));
  }
}
