import { AddPromptToFavoritesCommandHandler } from './add-prompt-to-favorites.command-handler';
import { RemovePromptFromFavoritesCommandHandler } from './remove-prompt-from-favorites.command-handler';

export const commandHandlers = [
  AddPromptToFavoritesCommandHandler,
  RemovePromptFromFavoritesCommandHandler,
];

export * from './add-prompt-to-favorites.command-handler';
export * from './remove-prompt-from-favorites.command-handler';
