import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePromptCommand } from '../commands';
import { PromptRepository } from '../ports';
import { PromptContent, PromptId, PromptTitle } from '../../domain';

@CommandHandler(UpdatePromptCommand)
export class UpdatePromptCommandHandler
  implements ICommandHandler<UpdatePromptCommand, void>
{
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: UpdatePromptCommand): Promise<void> {
    const { promptId, title, content } = command;

    // Get the prompt by ID
    const promptIdObj = PromptId.create(promptId);
    const prompt = await this.promptRepository.getByIdOrFail(promptIdObj);

    // Create value objects for title and content
    const promptTitle = PromptTitle.create(title);
    const promptContent = PromptContent.create(content);

    // Mark the prompt as an event publisher
    const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);

    // Update the prompt content
    promptWithEvents.updateContent(promptTitle, promptContent);

    // Save the updated prompt
    await this.promptRepository.save(promptWithEvents);

    // Commit events after saving
    promptWithEvents.commit();
  }
}
