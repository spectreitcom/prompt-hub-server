import { UserSearchView } from './user-search.view';

export class SearchPromptEntryView {
  constructor(
    private readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly author: UserSearchView,
    public readonly isPublic: boolean,
    public readonly status: string,
    public readonly copiedCount: number,
    public readonly viewCount: number,
    public readonly likedCount: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
