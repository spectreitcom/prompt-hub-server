import { PromptReportId } from '../prompt-report-id.value-object';
import { randomUUID } from 'crypto';

describe('PromptReportId', () => {
  describe('create', () => {
    it('should create a valid PromptReportId with a valid UUID', () => {
      // Arrange
      const validUuid = randomUUID();

      // Act
      const promptReportId = PromptReportId.create(validUuid);

      // Assert
      expect(promptReportId).toBeDefined();
      expect(promptReportId.getValue()).toBe(validUuid);
    });

    it('should store the UUID correctly', () => {
      // Arrange
      const validUuid = randomUUID();

      // Act
      const promptReportId = PromptReportId.create(validUuid);

      // Assert
      expect(promptReportId.getValue()).toBe(validUuid);
    });

    it('should throw an error if the UUID is empty', () => {
      // Act & Assert
      expect(() => PromptReportId.create('')).toThrow(
        'Prompt Report ID cannot be empty.',
      );
      expect(() => PromptReportId.create('   ')).toThrow(
        'Prompt Report ID cannot be empty.',
      );
    });

    it('should throw an error if the UUID is invalid', () => {
      // Act & Assert
      expect(() => PromptReportId.create('invalid-uuid')).toThrow(
        'Prompt Report ID must be a valid UUID.',
      );
      expect(() =>
        PromptReportId.create('123e4567-e89b-12d3-a456-42661417400'),
      ).toThrow('Prompt Report ID must be a valid UUID.');
    });
  });

  describe('getValue', () => {
    it('should return the UUID value', () => {
      // Arrange
      const validUuid = randomUUID();
      const promptReportId = PromptReportId.create(validUuid);

      // Act
      const result = promptReportId.getValue();

      // Assert
      expect(result).toBe(validUuid);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same UUID', () => {
      // Arrange
      const validUuid = randomUUID();
      const promptReportId1 = PromptReportId.create(validUuid);
      const promptReportId2 = PromptReportId.create(validUuid);

      // Act
      const result = promptReportId1.equals(promptReportId2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different UUIDs', () => {
      // Arrange
      const promptReportId1 = PromptReportId.create(randomUUID());
      const promptReportId2 = PromptReportId.create(randomUUID());

      // Act
      const result = promptReportId1.equals(promptReportId2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
