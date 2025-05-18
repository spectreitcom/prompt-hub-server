import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromptDetailsQuery } from '../queries';
import { PromptDetailsViewRepository } from '../ports';
import { PromptDetailsView } from '../../views';

@QueryHandler(GetPromptDetailsQuery)
export class GetPromptDetailsQueryHandler
  implements IQueryHandler<GetPromptDetailsQuery>
{
  constructor(
    private readonly promptDetailsViewRepository: PromptDetailsViewRepository,
  ) {}

  async execute(query: GetPromptDetailsQuery): Promise<PromptDetailsView> {
    return this.promptDetailsViewRepository.findById(query.promptId);
  }
}
