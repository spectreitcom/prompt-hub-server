import { FavoritePromptCreatedEventHandler } from './favorite-prompt-created.event-handler';
import { FavoritePromptRemovedEventHandler } from './favorite-prompt-removed.event-handler';

export const eventHandlers = [
  FavoritePromptCreatedEventHandler,
  FavoritePromptRemovedEventHandler,
];

export * from './favorite-prompt-created.event-handler';
export * from './favorite-prompt-removed.event-handler';
