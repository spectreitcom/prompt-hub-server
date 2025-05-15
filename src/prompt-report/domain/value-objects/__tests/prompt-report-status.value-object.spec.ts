import { PromptReportStatus } from '../prompt-report-status.value-object';
import { PromptReportStatus as PromptReportStatusType } from '@prisma/client';

describe('PromptReportStatus', () => {
  describe('factory methods', () => {
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

  describe('status checking methods', () => {
    it('isPending should return true only for pending status', () => {
      // Arrange
      const pendingStatus = PromptReportStatus.pending();
      const acceptedStatus = PromptReportStatus.accepted();
      const rejectedStatus = PromptReportStatus.rejected();

      // Assert
      expect(pendingStatus.isPending()).toBe(true);
      expect(acceptedStatus.isPending()).toBe(false);
      expect(rejectedStatus.isPending()).toBe(false);
    });

    it('isAccepted should return true only for accepted status', () => {
      // Arrange
      const pendingStatus = PromptReportStatus.pending();
      const acceptedStatus = PromptReportStatus.accepted();
      const rejectedStatus = PromptReportStatus.rejected();

      // Assert
      expect(pendingStatus.isAccepted()).toBe(false);
      expect(acceptedStatus.isAccepted()).toBe(true);
      expect(rejectedStatus.isAccepted()).toBe(false);
    });

    it('isRejected should return true only for rejected status', () => {
      // Arrange
      const pendingStatus = PromptReportStatus.pending();
      const acceptedStatus = PromptReportStatus.accepted();
      const rejectedStatus = PromptReportStatus.rejected();

      // Assert
      expect(pendingStatus.isRejected()).toBe(false);
      expect(acceptedStatus.isRejected()).toBe(false);
      expect(rejectedStatus.isRejected()).toBe(true);
    });
  });

  describe('getValue', () => {
    it('should return the status value', () => {
      // Arrange
      const pendingStatus = PromptReportStatus.pending();
      const acceptedStatus = PromptReportStatus.accepted();
      const rejectedStatus = PromptReportStatus.rejected();

      // Assert
      expect(pendingStatus.getValue()).toBe(PromptReportStatusType.PENDING);
      expect(acceptedStatus.getValue()).toBe(PromptReportStatusType.ACCEPTED);
      expect(rejectedStatus.getValue()).toBe(PromptReportStatusType.REJECTED);
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