import { PromptUserPublicView } from './prompt-user-public.view';

export class PromptListItemView {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly contentPreview: string,
    public readonly likedCount: number,
    public readonly copiedCount: number,
    public readonly viewCount: number,
    public readonly createdAt: Date,
    public readonly author: PromptUserPublicView,
  ) {}
}
