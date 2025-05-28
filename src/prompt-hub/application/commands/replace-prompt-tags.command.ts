import { ICommand } from '@nestjs/cqrs';

export class ReplacePromptTagsCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
    public readonly tags: string[],
  ) {}
}
