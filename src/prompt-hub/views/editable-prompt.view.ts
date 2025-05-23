import { PromptStatus } from '@prisma/client';

export class EditablePromptView {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly status: PromptStatus,
    public readonly isPublic: boolean,
  ) {}
}
