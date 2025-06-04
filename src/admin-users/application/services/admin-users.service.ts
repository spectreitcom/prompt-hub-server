import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAdminUserCommand } from '../commands';
import { GetPublicAdminUserViewQuery } from '../queries';
import { AdminUserView } from '../../views';
import { AdminUserReadRepository } from '../ports';

@Injectable()
export class AdminUsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly adminUserReadRepository: AdminUserReadRepository,
  ) {}

  /**
   * Creates a new admin user with the specified details.
   *
   * @param {string} email - The email address of the admin user.
   * @param {string} password - The password for the admin user.
   * @param {boolean} [isSuperuser=false] - Indicates if the admin user has superuser privileges.
   * @param {boolean} [isActive=true] - Specifies if the admin user account should be active.
   * @return {Promise<void>} A promise that resolves when the admin user is successfully created.
   */
  async createAdminUser(
    email: string,
    password: string,
    isSuperuser: boolean = false,
    isActive: boolean = true,
  ): Promise<void> {
    return this.commandBus.execute(
      new CreateAdminUserCommand(email, password, isSuperuser, isActive),
    );
  }

  /**
   * Retrieves the public view of an admin user based on the provided admin user ID.
   *
   * @param {string} adminUserId - The identifier of the admin user whose public view is being requested.
   * @return {Promise<AdminUserView>} A promise resolving to the public view of the admin user.
   */
  async getPublicAdminUserView(adminUserId: string): Promise<AdminUserView> {
    return this.queryBus.execute(new GetPublicAdminUserViewQuery(adminUserId));
  }

  /**
   * Fetches an AdminUserView object based on the provided email.
   *
   * @param {string} email - The email address of the admin user to retrieve.
   * @return {Promise<AdminUserView>} A promise that resolves to the AdminUserView object associated with the given email.
   */
  async findByEmail(email: string): Promise<AdminUserView> {
    return this.adminUserReadRepository.findByEmail(email);
  }
}
