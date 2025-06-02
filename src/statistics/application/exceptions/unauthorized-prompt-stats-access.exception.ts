export class UnauthorizedPromptStatsAccessException extends Error {
  constructor(
    message = 'You are not authorized to access these prompt statistics',
  ) {
    super(message);
  }
}
