import { PromptId } from '../prompt-id.value-object';
import { randomUUID } from 'crypto';

describe('PromptId', () => {
  describe('create', () => {
    it('should create a valid PromptId with a valid UUID', () => {
      // Arrange
      const validUuid = randomUUID();

      // Act
      const promptId = PromptId.create(validUuid);

      // Assert
      expect(promptId).toBeDefined();
      expect(promptId.getValue()).toBe(validUuid);
    });

    it('should trim the UUID when storing', () => {
      // Arrange
      const validUuid = randomUUID();
      const paddedUuid = `  ${validUuid}  `;

      // Act
      const promptId = PromptId.create(paddedUuid);

      // Assert
      expect(promptId.getValue()).toBe(validUuid);
    });

    it('should throw an error if the UUID is empty', () => {
      // Act & Assert
      expect(() => PromptId.create('')).toThrow('Prompt ID cannot be empty.');
      expect(() => PromptId.create('   ')).toThrow(
        'Prompt ID cannot be empty.',
      );
    });

    it('should throw an error if the UUID is invalid', () => {
      // Act & Assert
      expect(() => PromptId.create('invalid-uuid')).toThrow(
        'Prompt ID must be a valid UUID.',
      );
      expect(() =>
        PromptId.create('123e4567-e89b-12d3-a456-42661417400'),
      ).toThrow('Prompt ID must be a valid UUID.');
    });
  });

  describe('getValue', () => {
    it('should return the UUID value', () => {
      // Arrange
      const validUuid = randomUUID();
      const promptId = PromptId.create(validUuid);

      // Act
      const result = promptId.getValue();

      // Assert
      expect(result).toBe(validUuid);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same UUID', () => {
      // Arrange
      const validUuid = randomUUID();
      const promptId1 = PromptId.create(validUuid);
      const promptId2 = PromptId.create(validUuid);

      // Act
      const result = promptId1.equals(promptId2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different UUIDs', () => {
      // Arrange
      const promptId1 = PromptId.create(randomUUID());
      const promptId2 = PromptId.create(randomUUID());

      // Act
      const result = promptId1.equals(promptId2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
