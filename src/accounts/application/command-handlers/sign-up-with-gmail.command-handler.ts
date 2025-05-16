import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpWithGmailCommand } from '../commands';

@CommandHandler(SignUpWithGmailCommand)
export class SignUpWithGmailCommandHandler
  implements ICommandHandler<SignUpWithGmailCommand, void>
{
  execute(command: SignUpWithGmailCommand): Promise<void> {
    return Promise.resolve(undefined);
  }
}
