import { PromptDetailsView } from '../../views';

export abstract class PromptDetailsViewRepository {
  abstract save(promptDetailsView: PromptDetailsView): Promise<void>;
  abstract findById(id: string): Promise<PromptDetailsView>;
  abstract delete(id: string): Promise<void>;
}
