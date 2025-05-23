import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromptForEditQuery } from '../queries';
import { PromptRepository } from '../ports';
import { EditablePromptView } from '../../views';
import { PromptId, UserId, UnauthorizedPromptAccessException } from '../../domain';

@QueryHandler(GetPromptForEditQuery)
export class GetPromptForEditQueryHandler
  implements IQueryHandler<GetPromptForEditQuery>
{
  constructor(private readonly promptRepository: PromptRepository) {}

  async execute(query: GetPromptForEditQuery): Promise<EditablePromptView> {
    const prompt = await this.promptRepository.getByIdOrFail(
      PromptId.create(query.promptId),
    );

    const userId = UserId.create(query.userId);

    // Check if the current user is the owner of the prompt
    if (!prompt.getAuthorId().equals(userId)) {
      throw new UnauthorizedPromptAccessException(
        'You are not authorized to edit this prompt',
      );
    }

    return new EditablePromptView(
      prompt.getId().getValue(),
      prompt.getTitle().getValue(),
      prompt.getContent().getValue(),
      prompt.getStatus().getValue(),
      prompt.getVisibility().isPublic(),
    );
  }
}
