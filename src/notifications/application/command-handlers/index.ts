import { MarkNotificationAsReadCommandHandler } from './mark-notification-as-read.command-handler';
import { MarkAllNotificationsAsReadCommandHandler } from './mark-all-notifications-as-read.command-handler';

export const CommandHandlers = [
  MarkNotificationAsReadCommandHandler,
  MarkAllNotificationsAsReadCommandHandler,
];

export * from './mark-notification-as-read.command-handler';
export * from './mark-all-notifications-as-read.command-handler';
