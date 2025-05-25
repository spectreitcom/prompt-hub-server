import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PromptViewedCommand } from '../commands';
import { PromptRepository } from '../ports';
import { PromptId, UserId } from '../../domain';

@CommandHandler(PromptViewedCommand)
export class PromptViewedCommandHandler
  implements ICommandHandler<PromptViewedCommand, void>
{
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: PromptViewedCommand): Promise<void> {
    const { promptId, userId } = command;

    // Find the prompt
    const prompt = await this.promptRepository.getById(
      PromptId.create(promptId),
    );

    if (!prompt) {
      throw new Error(`Prompt with id ${promptId} not found.`);
    }

    // Create UserId only if userId is provided
    const userIdObj = userId ? UserId.create(userId) : undefined;

    prompt.viewed(userIdObj);

    // Mark the prompt as an event publisher
    const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);

    // Commit events after saving
    promptWithEvents.commit();
  }
}
