import { ICommand } from '@nestjs/cqrs';
import {
  EmailAddress,
  IsActive,
  IsSuperuser,
  PasswordHash,
} from '../../domain';

export class CreateAdminUserCommand implements ICommand {
  constructor(
    public readonly email: EmailAddress,
    public readonly password: PasswordHash,
    public readonly isSuperuser = IsSuperuser.notSuperuser(),
    public readonly isActive = IsActive.active(),
  ) {}
}
