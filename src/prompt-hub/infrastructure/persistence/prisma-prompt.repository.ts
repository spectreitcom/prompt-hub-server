import { Injectable } from '@nestjs/common';
import { PromptRepository } from '../../application';
import { Prompt, PromptId } from '../../domain';

@Injectable()
export class PrismaPromptRepository implements PromptRepository {
  delete(id: PromptId): Promise<void> {
    return Promise.resolve(undefined);
  }

  exists(id: PromptId): Promise<boolean> {
    return Promise.resolve(false);
  }

  getById(id: PromptId): Promise<Prompt | null> {
    return Promise.resolve(undefined);
  }

  getByIdOrFail(id: PromptId): Promise<Prompt> {
    return Promise.resolve(undefined);
  }

  save(prompt: Prompt): Promise<void> {
    return Promise.resolve(undefined);
  }
}
