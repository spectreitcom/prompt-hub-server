import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SetPromptVisibilityCommand } from '../commands';
import { PromptRepository } from '../ports';
import {
  PromptId,
  UserId,
  PromptNotFoundException,
  UnauthorizedPromptOperationException,
} from '../../domain';

@CommandHandler(SetPromptVisibilityCommand)
export class SetPromptVisibilityCommandHandler
  implements ICommandHandler<SetPromptVisibilityCommand, void>
{
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: SetPromptVisibilityCommand): Promise<void> {
    const { promptId, isPublic, userId } = command;

    // Find the prompt
    const promptIdObj = PromptId.create(promptId);
    const prompt = await this.promptRepository.getById(promptIdObj);

    if (!prompt) {
      throw new PromptNotFoundException(promptId);
    }

    // Check if the user is the owner of the prompt
    const userIdObj = UserId.create(userId);
    if (!prompt.getAuthorId().equals(userIdObj)) {
      throw new UnauthorizedPromptOperationException('change its visibility');
    }

    // Mark the prompt as an event publisher
    const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);

    // Set the visibility
    promptWithEvents.setVisibility(isPublic);

    // Save the prompt
    await this.promptRepository.save(promptWithEvents);

    // Commit events after saving
    promptWithEvents.commit();
  }
}
