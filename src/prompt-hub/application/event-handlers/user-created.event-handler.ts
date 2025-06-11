import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../../accounts';
import { PromptUserPublicRepository } from '../ports';
import { PromptUserPublicView } from '../../views';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(
    private readonly promptUserPublicRepository: PromptUserPublicRepository,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const { userId, name, avatarUrl } = event;

    const promptUserPublicView = await this.promptUserPublicRepository.findById(
      userId.getValue(),
    );

    if (promptUserPublicView) return;

    const promptUserPublicViewToCreate = new PromptUserPublicView(
      userId.getValue(),
      name.getValue(),
      avatarUrl.getValue(),
    );

    await this.promptUserPublicRepository.save(promptUserPublicViewToCreate);
  }
}
