import { PromptReportReason } from '../prompt-report-reason.value-object';

describe('PromptReportReason', () => {
  describe('create', () => {
    it('should create a valid PromptReportReason with a valid reason', () => {
      // Arrange
      const validReason = 'This is a valid reason for reporting';

      // Act
      const reason = PromptReportReason.create(validReason);

      // Assert
      expect(reason).toBeDefined();
      expect(reason.getValue()).toBe(validReason);
    });

    it('should trim the input value', () => {
      // Arrange
      const untrimmedReason = '  This has spaces around it  ';
      const trimmedReason = 'This has spaces around it';

      // Act
      const reason = PromptReportReason.create(untrimmedReason);

      // Assert
      expect(reason.getValue()).toBe(trimmedReason);
    });

    it('should throw an error if the reason is too short', () => {
      // Arrange
      const tooShortReason = 'abc';

      // Act & Assert
      expect(() => PromptReportReason.create(tooShortReason)).toThrow(
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

    it('should throw an error if the reason is empty after trimming', () => {
      // Arrange
      const emptyReason = '     ';

      // Act & Assert
      expect(() => PromptReportReason.create(emptyReason)).toThrow(
        'Report reason must be between 5 and 500 characters',
      );
    });

    it('should accept a reason at the minimum length', () => {
      // Arrange
      const minLengthReason = 'abcde'; // 5 characters

      // Act
      const reason = PromptReportReason.create(minLengthReason);

      // Assert
      expect(reason.getValue()).toBe(minLengthReason);
    });

    it('should accept a reason at the maximum length', () => {
      // Arrange
      const maxLengthReason = 'a'.repeat(500);

      // Act
      const reason = PromptReportReason.create(maxLengthReason);

      // Assert
      expect(reason.getValue()).toBe(maxLengthReason);
    });
  });

  describe('getValue', () => {
    it('should return the reason value', () => {
      // Arrange
      const reasonValue = 'This is a test reason';
      const reason = PromptReportReason.create(reasonValue);

      // Act
      const result = reason.getValue();

      // Assert
      expect(result).toBe(reasonValue);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same reason', () => {
      // Arrange
      const reasonValue = 'This is a test reason';
      const reason1 = PromptReportReason.create(reasonValue);
      const reason2 = PromptReportReason.create(reasonValue);

      // Act
      const result = reason1.equals(reason2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different reasons', () => {
      // Arrange
      const reason1 = PromptReportReason.create('This is reason 1');
      const reason2 = PromptReportReason.create('This is reason 2');

      // Act
      const result = reason1.equals(reason2);

      // Assert
      expect(result).toBe(false);
    });

    it('should return true when comparing reasons that differ only in whitespace before trimming', () => {
      // Arrange
      const reason1 = PromptReportReason.create('  This is a test  ');
      const reason2 = PromptReportReason.create('This is a test');

      // Act
      const result = reason1.equals(reason2);

      // Assert
      expect(result).toBe(true);
    });
  });
});
