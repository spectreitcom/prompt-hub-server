import { NotificationPromptUserView } from '../../views';

export abstract class NotificationPromptUserViewRepository {
  abstract save(
    notificationPromptUserView: NotificationPromptUserView,
  ): Promise<void>;
  abstract findById(id: string): Promise<NotificationPromptUserView>;
}
