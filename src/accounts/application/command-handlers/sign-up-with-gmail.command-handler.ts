import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
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
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

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

    // Create new user using factory method
    const user = User.create(
      userId,
      email,
      name,
      avatarUrl,
      googleId,
      provider,
    );

    // Mark the user as an event publisher
    const userWithEvents = this.eventPublisher.mergeObjectContext(user);

    // Save the user
    await this.userRepository.save(userWithEvents);

    // Commit events after saving
    userWithEvents.commit();
  }
}
