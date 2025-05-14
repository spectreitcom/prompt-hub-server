import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePromptCommand } from '../commands';

@CommandHandler(CreatePromptCommand)
export class CreatePromptCommandHandler
  implements ICommandHandler<CreatePromptCommand, void>
{
  execute(command: CreatePromptCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
