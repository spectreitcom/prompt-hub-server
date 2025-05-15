import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CopyPromptCommand } from '../commands';
import { PromptRepository } from '../ports';
import { PromptId, UserId } from '../../domain';

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

    // Find the prompt
    const promptIdObj = PromptId.create(promptId);
    const prompt = await this.promptRepository.getById(promptIdObj);

    if (!prompt) {
      throw new Error(`Prompt with id ${promptId} not found.`);
    }

    // Mark the prompt as an event publisher
    const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);

    // Copy the prompt
    const userIdObj = UserId.create(userId);
    promptWithEvents.copy(userIdObj);

    // Save the prompt
    await this.promptRepository.save(promptWithEvents);

    // Commit events after saving
    promptWithEvents.commit();
  }
}
