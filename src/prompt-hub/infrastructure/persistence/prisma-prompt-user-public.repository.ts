import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptUserPublicRepository } from '../../application';
import { PromptUserPublicView } from '../../views';

@Injectable()
export class PrismaPromptUserPublicRepository
  implements PromptUserPublicRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(promptUserPublic: PromptUserPublicView): Promise<void> {
    await this.prisma.promptUserPublic.upsert({
      where: {
        id: promptUserPublic.id,
      },
      update: {
        name: promptUserPublic.name,
        avatarUrl: promptUserPublic.avatarUrl,
      },
      create: {
        id: promptUserPublic.id,
        name: promptUserPublic.name,
        avatarUrl: promptUserPublic.avatarUrl,
      },
    });
  }

  async findById(id: string): Promise<PromptUserPublicView> {
    const promptUserPublic = await this.prisma.promptUserPublic.findUnique({
      where: {
        id,
      },
    });

    if (!promptUserPublic) {
      return null;
    }

    return new PromptUserPublicView(
      promptUserPublic.id,
      promptUserPublic.name,
      promptUserPublic.avatarUrl || undefined,
    );
  }
}
