import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a new prompt.
 */
export class CreatePromptDto {
  // Currently empty as the createPrompt method only requires the authorId,
  // which will be extracted from the authenticated user's token.
  // If additional fields are needed for prompt creation in the future,
  // they should be added here.
}
