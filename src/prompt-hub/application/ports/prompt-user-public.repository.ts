import { PromptUserPublicView } from '../../views';

export abstract class PromptUserPublicRepository {
  abstract save(promptUserPublic: PromptUserPublicView): Promise<void>;
  abstract findById(id: string): Promise<PromptUserPublicView>;
}
