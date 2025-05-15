import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { VotePromptCommand } from '../commands';
import { PromptVoteRepository } from '../ports';
import { PromptId, PromptVote, UserId, VoteType } from '../../domain';

@CommandHandler(VotePromptCommand)
export class VotePromptCommandHandler
  implements ICommandHandler<VotePromptCommand, void>
{
  constructor(
    private readonly promptVoteRepository: PromptVoteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: VotePromptCommand): Promise<void> {
    const { promptId, userId, voteType } = command;

    // Create value objects
    const promptIdVO = PromptId.create(promptId);
    const userIdVO = UserId.create(userId);
    const voteTypeVO = VoteType.create(voteType);

    // Check if vote already exists
    const voteExists = await this.promptVoteRepository.exists(
      promptIdVO,
      userIdVO,
    );

    let vote: PromptVote;

    if (voteExists) {
      // Get existing vote
      vote = await this.promptVoteRepository.getByPromptAndUser(
        promptIdVO,
        userIdVO,
      );

      // Change vote if different
      if (!vote.isSameVoteType(voteTypeVO)) {
        vote.changeVote(voteTypeVO);
      }
    } else {
      // Create new vote
      vote = PromptVote.create(promptIdVO, userIdVO, voteTypeVO);
    }

    // Mark the vote as an event publisher
    const voteWithEvents = this.eventPublisher.mergeObjectContext(vote);

    // Save the vote
    await this.promptVoteRepository.save(voteWithEvents);

    // Commit events after saving
    voteWithEvents.commit();
  }
}
