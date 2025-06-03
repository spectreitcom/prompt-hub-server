import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserReportedPromptQuery } from '../queries';
import { PromptReportRepository } from '../ports';

@QueryHandler(UserReportedPromptQuery)
export class UserReportedPromptQueryHandler
  implements IQueryHandler<UserReportedPromptQuery, boolean>
{
  constructor(private readonly repository: PromptReportRepository) {}

  async execute(query: UserReportedPromptQuery): Promise<boolean> {
    return this.repository.existsForPromptAndReporter(
      query.promptId,
      query.reporterId,
    );
  }
}
