import { FavoritePromptCreatedEventHandler } from './favorite-prompt-created.event-handler';
import { FavoritePromptRemovedEventHandler } from './favorite-prompt-removed.event-handler';
import { UserCreatedEventHandler } from './user-created.event-handler';
import { PromptPublishedEventHandler } from './prompt-published.event-handler';

export const eventHandlers = [
  FavoritePromptCreatedEventHandler,
  FavoritePromptRemovedEventHandler,
  UserCreatedEventHandler,
  PromptPublishedEventHandler,
];

export * from './favorite-prompt-created.event-handler';
export * from './favorite-prompt-removed.event-handler';
export * from './user-created.event-handler';
export * from './prompt-published.event-handler';
