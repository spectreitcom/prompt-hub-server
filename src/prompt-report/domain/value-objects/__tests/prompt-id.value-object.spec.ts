import { PromptId } from '../prompt-id.value-object';
import { v4 as uuidv4 } from 'uuid';

describe('PromptId', () => {
  describe('create', () => {
    it('should create a valid PromptId with a valid UUID', () => {
      // Arrange
      const uuid = uuidv4();

      // Act
      const promptId = PromptId.create(uuid);

      // Assert
      expect(promptId).toBeDefined();
      expect(promptId.getValue()).toBe(uuid);
    });

    it('should store the UUID correctly', () => {
      // Arrange
      const uuid = uuidv4();

      // Act
      const promptId = PromptId.create(uuid);

      // Assert
      expect(promptId.getValue()).toBe(uuid);
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
      const uuid = uuidv4();
      const promptId = PromptId.create(uuid);

      // Act
      const result = promptId.getValue();

      // Assert
      expect(result).toBe(uuid);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same PromptId', () => {
      // Arrange
      const uuid = uuidv4();
      const promptId1 = PromptId.create(uuid);
      const promptId2 = PromptId.create(uuid);

      // Act
      const result = promptId1.equals(promptId2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different PromptIds', () => {
      // Arrange
      const promptId1 = PromptId.create(uuidv4());
      const promptId2 = PromptId.create(uuidv4());

      // Act
      const result = promptId1.equals(promptId2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
