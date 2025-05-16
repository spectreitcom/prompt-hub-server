import { NotificationCreatedHandler } from './notification-created.handler';
import { NotificationReadHandler } from './notification-read.handler';
import { NotificationUnreadHandler } from './notification-unread.handler';

export const EventHandlers = [
  NotificationCreatedHandler,
  NotificationReadHandler,
  NotificationUnreadHandler,
];

export * from './notification-created.handler';
export * from './notification-read.handler';
export * from './notification-unread.handler';
