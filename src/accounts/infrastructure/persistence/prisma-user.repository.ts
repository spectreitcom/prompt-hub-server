import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { UserRepository } from '../../application';
import {
  User,
  EmailAddress,
  UserId,
  PersonName,
  AvatarUrl,
  Provider,
  GoogleId,
} from '../../domain';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: EmailAddress): Promise<User> {
    const userData = await this.prisma.user.findUnique({
      where: { email: email.getValue() },
    });

    if (!userData) return null;

    return this.mapToDomain(userData);
  }

  async findById(id: UserId): Promise<User> {
    const userData = await this.prisma.user.findUnique({
      where: { id: id.getValue() },
    });

    if (!userData) return null;

    return this.mapToDomain(userData);
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.getId() },
      update: {
        email: user.getEmail(),
        name: user.getName(),
        avatarUrl: user.getAvatarUrl(),
        googleId: user.getGoogleId(),
        provider: user.getProvider(),
        updatedAt: user.getUpdatedAt(),
      },
      create: {
        id: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
        avatarUrl: user.getAvatarUrl(),
        googleId: user.getGoogleId(),
        provider: user.getProvider(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      },
    });
  }

  private mapToDomain(userData: any): User {
    return new User(
      UserId.create(userData.id),
      EmailAddress.create(userData.email),
      PersonName.create(userData.name),
      userData.avatarUrl ? AvatarUrl.create(userData.avatarUrl) : undefined,
      GoogleId.create(userData.googleId),
      Provider.create(userData.provider),
      userData.createdAt,
      userData.updatedAt,
    );
  }
}
