import { Command, CommandRunner, Option } from 'nest-commander';
import { AdminUsersService } from '../services';

interface CreateAdminUserOptions {
  email: string;
  password: string;
  superuser: boolean;
  active: boolean;
}

@Command({
  name: 'create-admin',
  description: 'Create a new admin user',
})
export class CreateAdminUserCli extends CommandRunner {
  constructor(private readonly adminUsersService: AdminUsersService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: CreateAdminUserOptions,
  ): Promise<void> {
    if (!options.email || !options.password) {
      console.error('Email and password are required');
      return;
    }

    try {
      // Create an admin user with the provided options
      await this.adminUsersService.createAdminUser(
        options.email,
        options.password,
        true,
        true,
      );
      console.log(`Admin user ${options.email} created successfully`);
    } catch (error) {
      console.error(
        `Failed to create admin user: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  @Option({
    flags: '-e, --email <email>',
    description: 'Admin user email',
    required: true,
  })
  parseEmail(value: string): string {
    return value;
  }

  @Option({
    flags: '-p, --password <password>',
    description: 'Admin user password',
    required: true,
  })
  parsePassword(value: string): string {
    return value;
  }
}
