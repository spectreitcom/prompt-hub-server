import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignUpWithGmailCommand } from '../commands';
import { GetPublicUserViewQuery, GetUserByIdQuery } from '../queries';
import { UserRepository } from '../ports';
import {
  EmailAddress,
  GoogleId,
  PersonName,
  AvatarUrl,
  User,
} from '../../domain';
import { UserProfileView } from '../../views';

@Injectable()
export class AccountsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
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
      GoogleId.create(googleId),
      EmailAddress.create(email),
      PersonName.create(name),
      avatarUrl ? AvatarUrl.create(avatarUrl) : undefined,
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

  /**
   * Gets the public view of a user by their ID.
   *
   * @param {string} userId - The ID of the user to get the public view for.
   * @return {Promise<UserProfileView|null>} A promise that resolves to the user's public view if found, or null if no user is found.
   */
  async getPublicUserView(userId: string): Promise<UserProfileView> {
    const query = new GetPublicUserViewQuery(userId);
    return this.queryBus.execute(query);
  }

  /**
   * Gets a user by their ID.
   *
   * @param {string} userId - The ID of the user to retrieve.
   * @return {Promise<User>} A promise that resolves to the user if found, or throws an error if no user is found.
   */
  async getUserById(userId: string): Promise<User> {
    const query = new GetUserByIdQuery(userId);
    return this.queryBus.execute(query);
  }
}
