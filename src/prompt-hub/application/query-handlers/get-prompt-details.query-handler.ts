import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromptDetailsQuery } from '../queries';
import { PromptDetailsViewRepository } from '../ports';
import { PromptDetailsView } from '../../views';
import { UnauthorizedPromptAccessException } from '../../domain';

@QueryHandler(GetPromptDetailsQuery)
export class GetPromptDetailsQueryHandler
  implements IQueryHandler<GetPromptDetailsQuery>
{
  constructor(
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async execute(query: GetPromptDetailsQuery): Promise<PromptDetailsView> {
    const promptDetails = await this.promptDetailsViewRepository.findById(
      query.promptId,
    );

    if (!promptDetails) {
      return null;
    }

    // Allow access if the prompt is public or if the current user is the author
    const isPublic = promptDetails.isPublic;
    const isAuthor = query.userId && promptDetails.author.id === query.userId;

    if (!isPublic && !isAuthor) {
      throw new UnauthorizedPromptAccessException(
        'You are not authorized to view this prompt',
      );
    }

    return promptDetails;
  }
}
