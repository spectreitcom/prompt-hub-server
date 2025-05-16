import { GetUserNotificationsQueryHandler } from './get-user-notifications.query-handler';
import { GetUnreadNotificationCountQueryHandler } from './get-unread-notification-count.query-handler';

export const QueryHandlers = [
  GetUserNotificationsQueryHandler,
  GetUnreadNotificationCountQueryHandler,
];

export * from './get-user-notifications.query-handler';
export * from './get-unread-notification-count.query-handler';
