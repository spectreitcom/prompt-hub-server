import { NotificationPromptView } from '../../views';

export abstract class NotificationPromptViewRepository {
  abstract save(notificationPromptView: NotificationPromptView): Promise<void>;
  abstract findById(id: string): Promise<NotificationPromptView>;
  abstract delete(id: string): Promise<void>;
}
