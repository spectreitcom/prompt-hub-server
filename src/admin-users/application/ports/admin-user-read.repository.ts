import { AdminUserView } from '../../views';

export abstract class AdminUserReadRepository {
  abstract findById(id: string): Promise<AdminUserView>;
  abstract findAll(skip: number, take: number): Promise<AdminUserView[]>;
}
