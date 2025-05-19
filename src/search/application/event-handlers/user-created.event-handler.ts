import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../../../accounts/domain';
import { UserSearchViewRepository } from '../ports';
import { UserSearchView } from '../../views';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(
    private readonly userSearchViewRepository: UserSearchViewRepository,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const { userId, name, avatarUrl } = event;

    const existingUserSearchView = await this.userSearchViewRepository.findById(
      userId.getValue(),
    );

    if (existingUserSearchView) {
      return;
    }

    const userSearchView = new UserSearchView(
      userId.getValue(),
      name.getValue(),
      avatarUrl.getValue(),
    );

    await this.userSearchViewRepository.save(userSearchView);
  }
}
