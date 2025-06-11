import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CopyPromptCommand } from '../commands';
import { PromptRepository } from '../ports';
import { PromptId, UserId, PromptNotFoundException } from '../../domain';

@CommandHandler(CopyPromptCommand)
export class CopyPromptCommandHandler
  implements ICommandHandler<CopyPromptCommand, void>
{
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CopyPromptCommand): Promise<void> {
    const { promptId, userId } = command;

    // Find the original prompt
    const prompt = await this.promptRepository.getById(
      PromptId.create(promptId),
    );

    if (!prompt) {
      throw new PromptNotFoundException(promptId);
    }

    // Only create UserId if userId is provided
    const userIdObj = userId ? UserId.create(userId) : undefined;
    prompt.copy(userIdObj);

    // Mark the original prompt as an event publisher
    const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);

    // Commit events after saving
    promptWithEvents.commit();
  }
}
