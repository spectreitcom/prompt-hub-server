import { NotificationCreatedHandler } from './notification-created.handler';
import { NotificationReadHandler } from './notification-read.handler';
import { NotificationUnreadHandler } from './notification-unread.handler';
import { UserCreatedEventHandler } from './user-created.event-handler';
import { PromptPublishedEventHandler } from './prompt-published.event-handler';
import { PromptUpdatedEventHandler } from './prompt-updated.event-handler';
import { PromptDeletedEventHandler } from './prompt-deleted.event-handler';
import { PromptVoteCreatedEventHandler } from './prompt-vote-created.event-handler';

export const EventHandlers = [
  NotificationCreatedHandler,
  NotificationReadHandler,
  NotificationUnreadHandler,
  UserCreatedEventHandler,
  PromptPublishedEventHandler,
  PromptUpdatedEventHandler,
  PromptDeletedEventHandler,
  PromptVoteCreatedEventHandler,
];

export * from './notification-created.handler';
export * from './notification-read.handler';
export * from './notification-unread.handler';
export * from './user-created.event-handler';
export * from './prompt-published.event-handler';
export * from './prompt-updated.event-handler';
export * from './prompt-deleted.event-handler';
export * from './prompt-vote-created.event-handler';
