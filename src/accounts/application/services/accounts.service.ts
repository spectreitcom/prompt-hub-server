import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpWithGmailCommand } from '../commands';

@Injectable()
export class AccountsService {
  constructor(private readonly commandBus: CommandBus) {}

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
}
