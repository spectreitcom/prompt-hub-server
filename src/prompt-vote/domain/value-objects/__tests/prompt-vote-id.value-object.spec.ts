import { PromptVoteId } from '../prompt-vote-id.value-object';
import { randomUUID } from 'crypto';

describe('PromptVoteId', () => {
  describe('create', () => {
    it('should create a valid PromptVoteId with a valid UUID', () => {
      // Arrange
      const validUuid = randomUUID();

      // Act
      const promptVoteId = PromptVoteId.create(validUuid);

      // Assert
      expect(promptVoteId).toBeDefined();
      expect(promptVoteId.getValue()).toBe(validUuid);
    });

    it('should trim the UUID when storing', () => {
      // Arrange
      const validUuid = randomUUID();
      const paddedUuid = `  ${validUuid}  `;

      // Act
      const promptVoteId = PromptVoteId.create(validUuid);
      const trimmedPromptVoteId = PromptVoteId.create(paddedUuid.trim());

      // Assert
      expect(promptVoteId.getValue()).toBe(trimmedPromptVoteId.getValue());
    });

    it('should throw an error if the UUID is empty', () => {
      // Act & Assert
      expect(() => PromptVoteId.create('')).toThrow(
        'Prompt Vote ID cannot be empty.',
      );
      expect(() => PromptVoteId.create('   ')).toThrow(
        'Prompt Vote ID cannot be empty.',
      );
    });

    it('should throw an error if the UUID is invalid', () => {
      // Act & Assert
      expect(() => PromptVoteId.create('invalid-uuid')).toThrow(
        'Prompt Vote ID must be a valid UUID.',
      );
      expect(() =>
        PromptVoteId.create('123e4567-e89b-12d3-a456-42661417400'),
      ).toThrow('Prompt Vote ID must be a valid UUID.');
    });
  });

  describe('getValue', () => {
    it('should return the UUID value', () => {
      // Arrange
      const validUuid = randomUUID();
      const promptVoteId = PromptVoteId.create(validUuid);

      // Act
      const result = promptVoteId.getValue();

      // Assert
      expect(result).toBe(validUuid);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same UUID', () => {
      // Arrange
      const validUuid = randomUUID();
      const promptVoteId1 = PromptVoteId.create(validUuid);
      const promptVoteId2 = PromptVoteId.create(validUuid);

      // Act
      const result = promptVoteId1.equals(promptVoteId2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different UUIDs', () => {
      // Arrange
      const promptVoteId1 = PromptVoteId.create(randomUUID());
      const promptVoteId2 = PromptVoteId.create(randomUUID());

      // Act
      const result = promptVoteId1.equals(promptVoteId2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
