import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePromptCommand } from '../commands';
import { PromptRepository } from '../ports';
import { Prompt, UserId } from '../../domain';

@CommandHandler(CreatePromptCommand)
export class CreatePromptCommandHandler
  implements ICommandHandler<CreatePromptCommand, string>
{
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreatePromptCommand): Promise<string> {
    const { authorId } = command;

    // Create a new prompt draft
    const userId = UserId.create(authorId);
    const prompt = Prompt.createDraft(userId);

    // Mark the prompt as an event publisher
    const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);

    // Save the prompt
    await this.promptRepository.save(promptWithEvents);

    // Commit events after saving
    promptWithEvents.commit();

    // Return the prompt ID
    return promptWithEvents.getId().getValue();
  }
}
