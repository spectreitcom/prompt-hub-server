import { FavoriteUserPublicView } from './favorite-user-public.view';

export class FavoritePromptEntryView {
  constructor(
    public readonly promptId: string,
    public readonly title: string,
    public readonly author: FavoriteUserPublicView,
    public readonly userId: string,
  ) {}
}
