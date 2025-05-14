import { PromptReportStatus } from '../prompt-report-status.value-object';
import { PromptReportStatus as PromptReportStatusType } from '@prisma/client';

describe('PromptReportStatus', () => {
  describe('pending', () => {
    it('should create a pending status', () => {
      // Act
      const status = PromptReportStatus.pending();

      // Assert
      expect(status).toBeDefined();
      expect(status.getValue()).toBe(PromptReportStatusType.PENDING);
      expect(status.isPending()).toBe(true);
      expect(status.isAccepted()).toBe(false);
      expect(status.isRejected()).toBe(false);
    });
  });

  describe('accepted', () => {
    it('should create an accepted status', () => {
      // Act
      const status = PromptReportStatus.accepted();

      // Assert
      expect(status).toBeDefined();
      expect(status.getValue()).toBe(PromptReportStatusType.ACCEPTED);
      expect(status.isPending()).toBe(false);
      expect(status.isAccepted()).toBe(true);
      expect(status.isRejected()).toBe(false);
    });
  });

  describe('rejected', () => {
    it('should create a rejected status', () => {
      // Act
      const status = PromptReportStatus.rejected();

      // Assert
      expect(status).toBeDefined();
      expect(status.getValue()).toBe(PromptReportStatusType.REJECTED);
      expect(status.isPending()).toBe(false);
      expect(status.isAccepted()).toBe(false);
      expect(status.isRejected()).toBe(true);
    });
  });

  describe('getValue', () => {
    it('should return the status value', () => {
      // Arrange
      const status = PromptReportStatus.pending();

      // Act
      const result = status.getValue();

      // Assert
      expect(result).toBe(PromptReportStatusType.PENDING);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same status', () => {
      // Arrange
      const status1 = PromptReportStatus.pending();
      const status2 = PromptReportStatus.pending();

      // Act
      const result = status1.equals(status2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different statuses', () => {
      // Arrange
      const status1 = PromptReportStatus.pending();
      const status2 = PromptReportStatus.accepted();

      // Act
      const result = status1.equals(status2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
