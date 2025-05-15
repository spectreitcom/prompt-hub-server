import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePromptCommand } from '../commands';
import { PromptRepository } from '../ports';

@CommandHandler(CreatePromptCommand)
export class CreatePromptCommandHandler
  implements ICommandHandler<CreatePromptCommand, void>
{
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  execute(command: CreatePromptCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
