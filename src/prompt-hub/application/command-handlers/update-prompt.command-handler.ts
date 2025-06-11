import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePromptCommand } from '../commands';
import { PromptRepository } from '../ports';
import {
  PromptContent,
  PromptId,
  PromptInstruction,
  PromptTitle,
  UserId,
  UnauthorizedPromptOperationException,
} from '../../domain';

@CommandHandler(UpdatePromptCommand)
export class UpdatePromptCommandHandler
  implements ICommandHandler<UpdatePromptCommand, void>
{
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: UpdatePromptCommand): Promise<void> {
    const { promptId, title, content, userId } = command;

    // Get the prompt by ID
    const promptIdObj = PromptId.create(promptId);
    const prompt = await this.promptRepository.getByIdOrFail(promptIdObj);

    // Check if the user is the owner of the prompt
    const userIdObj = UserId.create(userId);
    if (!prompt.getAuthorId().equals(userIdObj)) {
      throw new UnauthorizedPromptOperationException('update');
    }

    // Create value objects for title, content, and instruction
    const promptTitle = PromptTitle.create(title);
    const promptContent = PromptContent.create(content);
    const promptInstruction =
      command.instruction !== undefined
        ? PromptInstruction.create(command.instruction)
        : undefined;

    // Mark the prompt as an event publisher
    const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);

    // Update the prompt content
    promptWithEvents.updateContent(
      promptTitle,
      promptContent,
      promptInstruction,
    );

    // Save the updated prompt
    await this.promptRepository.save(promptWithEvents);

    // Commit events after saving
    promptWithEvents.commit();
  }
}
