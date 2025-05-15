import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PublishPromptCommand } from '../commands';
import { PromptRepository } from '../ports';
import { PromptId } from '../../domain';

@CommandHandler(PublishPromptCommand)
export class PublishPromptCommandHandler
  implements ICommandHandler<PublishPromptCommand, void>
{
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: PublishPromptCommand): Promise<void> {
    const { promptId } = command;

    // Find the prompt
    const promptIdObj = PromptId.create(promptId);
    const prompt = await this.promptRepository.getById(promptIdObj);

    if (!prompt) {
      throw new Error(`Prompt with id ${promptId} not found.`);
    }

    // Mark the prompt as an event publisher
    const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);

    // Publish the prompt
    promptWithEvents.makePublished();

    // Save the prompt
    await this.promptRepository.save(promptWithEvents);

    // Commit events after saving
    promptWithEvents.commit();
  }
}
