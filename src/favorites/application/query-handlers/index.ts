import { GetFavoritePromptsQueryHandler } from './get-favorite-prompts.query-handler';
import { IsPromptInFavoritesQueryHandler } from './is-prompt-in-favorites.query-handler';

export const queryHandlers = [
  GetFavoritePromptsQueryHandler,
  IsPromptInFavoritesQueryHandler,
];

export * from './get-favorite-prompts.query-handler';
export * from './is-prompt-in-favorites.query-handler';
