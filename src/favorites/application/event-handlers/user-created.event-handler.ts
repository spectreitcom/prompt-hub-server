import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../../../accounts';
import { FavoriteUserPublicRepository } from '../ports';
import { FavoriteUserPublicView } from '../../views';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(
    private readonly favoriteUserPublicRepository: FavoriteUserPublicRepository,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const { userId, name, avatarUrl } = event;

    await this.favoriteUserPublicRepository.save(
      new FavoriteUserPublicView(
        userId.getValue(),
        name.getValue(),
        avatarUrl ? avatarUrl.getValue() : undefined,
      ),
    );
  }
}
