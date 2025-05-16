import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SignUpWithGmailCommand } from '../commands';
import { UserRepository } from '../ports';
import { AvatarUrl, EmailAddress, UserId, User } from '../../domain';

@Injectable()
@CommandHandler(SignUpWithGmailCommand)
export class SignUpWithGmailCommandHandler
  implements ICommandHandler<SignUpWithGmailCommand, void>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: SignUpWithGmailCommand): Promise<void> {
    const { googleId, email, name, avatarUrl } = command;

    // Create value objects
    const emailAddress = EmailAddress.create(email);

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(emailAddress);
    if (existingUser) {
      // User already exists, no need to create a new one
      return;
    }

    // Create a new user
    const userId = UserId.create(uuidv4());
    const now = new Date();

    // Create avatar URL value object if provided
    const userAvatarUrl = avatarUrl ? AvatarUrl.create(avatarUrl) : undefined;

    // Create new user
    const user = new User(
      userId.getValue(),
      emailAddress.getValue(),
      name,
      userAvatarUrl?.getValue(),
      'google',
      now,
      now,
    );

    // Save the user
    await this.userRepository.save(user);
  }
}
