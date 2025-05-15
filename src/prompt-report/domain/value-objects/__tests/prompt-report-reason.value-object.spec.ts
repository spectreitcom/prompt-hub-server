import { PromptReportReason } from '../prompt-report-reason.value-object';

describe('PromptReportReason', () => {
  describe('create', () => {
    it('should create a valid PromptReportReason with a valid reason', () => {
      // Arrange
      const validReason = 'This is a valid reason';

      // Act
      const promptReportReason = PromptReportReason.create(validReason);

      // Assert
      expect(promptReportReason).toBeDefined();
      expect(promptReportReason.getValue()).toBe(validReason);
    });

    it('should trim the reason when storing', () => {
      // Arrange
      const validReason = 'This is a valid reason';
      const paddedReason = `  ${validReason}  `;

      // Act
      const promptReportReason = PromptReportReason.create(paddedReason);

      // Assert
      expect(promptReportReason.getValue()).toBe(validReason);
    });

    it('should throw an error if the reason is too short', () => {
      // Act & Assert
      expect(() => PromptReportReason.create('abc')).toThrow(
        'Report reason must be between 5 and 500 characters',
      );
      expect(() => PromptReportReason.create('   a   ')).toThrow(
        'Report reason must be between 5 and 500 characters',
      );
    });

    it('should throw an error if the reason is too long', () => {
      // Arrange
      const tooLongReason = 'a'.repeat(501);

      // Act & Assert
      expect(() => PromptReportReason.create(tooLongReason)).toThrow(
        'Report reason must be between 5 and 500 characters',
      );
    });
  });

  describe('getValue', () => {
    it('should return the reason value', () => {
      // Arrange
      const validReason = 'This is a valid reason';
      const promptReportReason = PromptReportReason.create(validReason);

      // Act
      const result = promptReportReason.getValue();

      // Assert
      expect(result).toBe(validReason);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same reason', () => {
      // Arrange
      const validReason = 'This is a valid reason';
      const promptReportReason1 = PromptReportReason.create(validReason);
      const promptReportReason2 = PromptReportReason.create(validReason);

      // Act
      const result = promptReportReason1.equals(promptReportReason2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different reasons', () => {
      // Arrange
      const promptReportReason1 = PromptReportReason.create('This is reason 1');
      const promptReportReason2 = PromptReportReason.create('This is reason 2');

      // Act
      const result = promptReportReason1.equals(promptReportReason2);

      // Assert
      expect(result).toBe(false);
    });
  });
});