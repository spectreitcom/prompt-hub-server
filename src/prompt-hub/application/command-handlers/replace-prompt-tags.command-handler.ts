import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReplacePromptTagsCommand } from '../commands';
import { PromptRepository } from '../ports';
import {
  PromptId,
  TagValue,
  UserId,
  UnauthorizedPromptOperationException,
} from '../../domain';

@CommandHandler(ReplacePromptTagsCommand)
export class ReplacePromptTagsCommandHandler
  implements ICommandHandler<ReplacePromptTagsCommand, void>
{
  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: ReplacePromptTagsCommand): Promise<void> {
    const { promptId, userId, tags } = command;

    // Get the prompt by ID
    const promptIdObj = PromptId.create(promptId);
    const prompt = await this.promptRepository.getByIdOrFail(promptIdObj);

    // Check if the user is the owner of the prompt
    const userIdObj = UserId.create(userId);
    if (!prompt.getAuthorId().equals(userIdObj)) {
      throw new UnauthorizedPromptOperationException('update its tags');
    }

    // Create TagValue objects from the string tags
    const tagValues = tags.map((tag) => TagValue.create(tag));

    // Mark the prompt as an event publisher
    const promptWithEvents = this.eventPublisher.mergeObjectContext(prompt);

    // Replace the tags
    promptWithEvents.replaceTags(tagValues);

    // Save the updated prompt
    await this.promptRepository.save(promptWithEvents);

    // Commit events after saving
    promptWithEvents.commit();
  }
}
