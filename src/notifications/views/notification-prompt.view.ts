import { NotificationPromptUserView } from './notification-prompt-user.view';

export class NotificationPromptView {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: NotificationPromptUserView,
  ) {}
}
