import { Injectable } from '@nestjs/common';
import { PromptVoteEntryViewRepository } from '../../application';
import { PromptVoteEntryView } from '../../views';

@Injectable()
export class PrismaPromptVoteEntryViewRepository
  implements PromptVoteEntryViewRepository
{
  exists(promptId: string, userId: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  findByPromptAndUser(
    promptId: string,
    userId: string,
  ): Promise<PromptVoteEntryView> {
    return Promise.resolve(undefined);
  }

  save(promptVoteEntryView: PromptVoteEntryView): Promise<void> {
    return Promise.resolve(undefined);
  }
}
