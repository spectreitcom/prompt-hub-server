import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromptForEditQuery } from '../queries';
import { PromptRepository } from '../ports';
import { EditablePromptView } from '../../views';
import { PromptId } from '../../domain';

@QueryHandler(GetPromptForEditQuery)
export class GetPromptForEditQueryHandler
  implements IQueryHandler<GetPromptForEditQuery>
{
  constructor(private readonly promptRepository: PromptRepository) {}

  async execute(query: GetPromptForEditQuery): Promise<EditablePromptView> {
    const prompt = await this.promptRepository.getByIdOrFail(
      PromptId.create(query.promptId),
    );

    return new EditablePromptView(
      prompt.getId().getValue(),
      prompt.getTitle().getValue(),
      prompt.getContent().getValue(),
      prompt.getStatus().getValue(),
      prompt.getVisibility().isPublic(),
    );
  }
}
