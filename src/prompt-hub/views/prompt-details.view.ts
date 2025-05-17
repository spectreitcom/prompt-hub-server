import { PromptUserPublicView } from './prompt-user-public.view';

export class PromptDetailsView {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly isPublic: boolean,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly likedCount: number,
    public readonly copiedCount: number,
    public readonly viewCount: number,
    public readonly author: PromptUserPublicView,
  ) {}
}
