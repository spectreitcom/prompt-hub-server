import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SignUpWithGmailCommand } from '../commands';
import { UserRepository } from '../ports';
import { UserId, User, Provider } from '../../domain';

@Injectable()
@CommandHandler(SignUpWithGmailCommand)
export class SignUpWithGmailCommandHandler
  implements ICommandHandler<SignUpWithGmailCommand, void>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: SignUpWithGmailCommand): Promise<void> {
    const { googleId, email, name, avatarUrl } = command;

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      // User already exists, no need to create a new one
      return;
    }

    // Create a new user
    const userId = UserId.create(uuidv4());
    const provider = Provider.google();
    const now = new Date();

    // Create new user
    const user = new User(
      userId,
      email,
      name,
      avatarUrl,
      googleId,
      provider,
      now,
      now,
    );

    // Save the user
    await this.userRepository.save(user);
  }
}
