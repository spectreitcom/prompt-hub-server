import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeletePromptCommand } from '../commands';
import { PromptRepository } from '../ports';
import {
  PromptId,
  UserId,
  PromptNotFoundException,
  UnauthorizedPromptOperationException,
} from '../../domain';

@CommandHandler(DeletePromptCommand)
export class DeletePromptCommandHandler
  implements ICommandHandler<DeletePromptCommand, void>
{
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: DeletePromptCommand): Promise<void> {
    const { promptId, userId } = command;

    // Find the prompt
    const prompt = await this.promptRepository.getById(
      PromptId.create(promptId),
    );

    if (!prompt) {
      throw new PromptNotFoundException(promptId);
    }

    // Check if the user is the owner of the prompt
    const userIdObj = UserId.create(userId);
    if (!prompt.getAuthorId().equals(userIdObj)) {
      throw new UnauthorizedPromptOperationException('delete');
    }

    // Mark the prompt as deleted in the domain model
    prompt.delete();

    // Mark the prompt as an event publisher
    const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);

    // Soft delete the prompt in the repository
    await this.promptRepository.softDelete(PromptId.create(promptId));

    // Commit events after saving
    promptWithEvents.commit();
  }
}
