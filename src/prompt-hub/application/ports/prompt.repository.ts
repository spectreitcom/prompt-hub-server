import { Prompt, PromptId } from '../../domain';

export abstract class PromptRepository {
  abstract getById(id: PromptId): Promise<Prompt | null>;
  abstract getByIdOrFail(id: PromptId): Promise<Prompt>;
  abstract save(prompt: Prompt): Promise<void>;
  abstract delete(id: PromptId): Promise<void>;
  abstract exists(id: PromptId): Promise<boolean>;
}
