import { PromptReport } from '../prompt-report';
import {
  PromptId,
  PromptReportId,
  PromptReportReason,
  PromptReportStatus,
  UserId,
} from '../value-objects';
import {
  PromptReportAcceptedEvent,
  PromptReportCreatedEvent,
  PromptReportRejectedEvent,
} from '../events';
import { v4 as uuidv4 } from 'uuid';

describe('PromptReport', () => {
  describe('create', () => {
    it('should create a new prompt report with pending status', () => {
      // Arrange
      const promptId = PromptId.create(uuidv4());
      const reporterId = UserId.create(uuidv4());
      const reason = PromptReportReason.create('This is a valid reason');

      // Act
      const report = PromptReport.create(promptId, reporterId, reason);

      // Assert
      expect(report).toBeDefined();
      expect(report.getPromptId()).toBe(promptId);
      expect(report.getReporterId()).toBe(reporterId);
      expect(report.getReason()).toBe(reason);
      expect(report.getStatus().isPending()).toBe(true);
      expect(report.getCreatedAt()).toBeInstanceOf(Date);
    });

    it('should apply PromptReportCreatedEvent when created', () => {
      // Arrange
      const promptId = PromptId.create(uuidv4());
      const reporterId = UserId.create(uuidv4());
      const reason = PromptReportReason.create('This is a valid reason');
      
      // Spy on apply method
      const applySpy = jest.spyOn(PromptReport.prototype, 'apply');

      // Act
      const report = PromptReport.create(promptId, reporterId, reason);

      // Assert
      expect(applySpy).toHaveBeenCalledWith(
        expect.any(PromptReportCreatedEvent)
      );
      
      const event = applySpy.mock.calls[0][0] as PromptReportCreatedEvent;
      expect(event.reportId).toBe(report.getId());
      expect(event.promptId).toBe(promptId);
      expect(event.reporterId).toBe(reporterId);
      expect(event.reason).toBe(reason);
      
      // Clean up
      applySpy.mockRestore();
    });
  });

  describe('accept', () => {
    it('should change status to accepted', () => {
      // Arrange
      const promptId = PromptId.create(uuidv4());
      const reporterId = UserId.create(uuidv4());
      const reason = PromptReportReason.create('This is a valid reason');
      const report = PromptReport.create(promptId, reporterId, reason);

      // Act
      report.accept();

      // Assert
      expect(report.getStatus().isAccepted()).toBe(true);
      expect(report.isPending()).toBe(false);
      expect(report.isAccepted()).toBe(true);
      expect(report.isRejected()).toBe(false);
    });

    it('should apply PromptReportAcceptedEvent when accepted', () => {
      // Arrange
      const promptId = PromptId.create(uuidv4());
      const reporterId = UserId.create(uuidv4());
      const reason = PromptReportReason.create('This is a valid reason');
      const report = PromptReport.create(promptId, reporterId, reason);
      
      // Spy on apply method
      const applySpy = jest.spyOn(report, 'apply');

      // Act
      report.accept();

      // Assert
      expect(applySpy).toHaveBeenCalledWith(
        expect.any(PromptReportAcceptedEvent)
      );
      
      const event = applySpy.mock.calls[0][0] as PromptReportAcceptedEvent;
      expect(event.reportId).toBe(report.getId());
      expect(event.promptId).toBe(promptId);
      
      // Clean up
      applySpy.mockRestore();
    });

    it('should throw an error if report is not pending', () => {
      // Arrange
      const promptId = PromptId.create(uuidv4());
      const reporterId = UserId.create(uuidv4());
      const reason = PromptReportReason.create('This is a valid reason');
      const report = PromptReport.create(promptId, reporterId, reason);
      
      // Change status to accepted
      report.accept();

      // Act & Assert
      expect(() => report.accept()).toThrow('Only pending reports can be accepted');
    });
  });

  describe('reject', () => {
    it('should change status to rejected', () => {
      // Arrange
      const promptId = PromptId.create(uuidv4());
      const reporterId = UserId.create(uuidv4());
      const reason = PromptReportReason.create('This is a valid reason');
      const report = PromptReport.create(promptId, reporterId, reason);

      // Act
      report.reject();

      // Assert
      expect(report.getStatus().isRejected()).toBe(true);
      expect(report.isPending()).toBe(false);
      expect(report.isAccepted()).toBe(false);
      expect(report.isRejected()).toBe(true);
    });

    it('should apply PromptReportRejectedEvent when rejected', () => {
      // Arrange
      const promptId = PromptId.create(uuidv4());
      const reporterId = UserId.create(uuidv4());
      const reason = PromptReportReason.create('This is a valid reason');
      const report = PromptReport.create(promptId, reporterId, reason);
      
      // Spy on apply method
      const applySpy = jest.spyOn(report, 'apply');

      // Act
      report.reject();

      // Assert
      expect(applySpy).toHaveBeenCalledWith(
        expect.any(PromptReportRejectedEvent)
      );
      
      const event = applySpy.mock.calls[0][0] as PromptReportRejectedEvent;
      expect(event.reportId).toBe(report.getId());
      
      // Clean up
      applySpy.mockRestore();
    });

    it('should throw an error if report is not pending', () => {
      // Arrange
      const promptId = PromptId.create(uuidv4());
      const reporterId = UserId.create(uuidv4());
      const reason = PromptReportReason.create('This is a valid reason');
      const report = PromptReport.create(promptId, reporterId, reason);
      
      // Change status to rejected
      report.reject();

      // Act & Assert
      expect(() => report.reject()).toThrow('Only pending reports can be rejected');
    });
  });

  describe('constructor', () => {
    it('should create a prompt report with the provided values', () => {
      // Arrange
      const id = PromptReportId.create(uuidv4());
      const promptId = PromptId.create(uuidv4());
      const reporterId = UserId.create(uuidv4());
      const reason = PromptReportReason.create('This is a valid reason');
      const status = PromptReportStatus.pending();
      const createdAt = new Date();

      // Act
      const report = new PromptReport(
        id,
        promptId,
        reporterId,
        reason,
        status,
        createdAt
      );

      // Assert
      expect(report.getId()).toBe(id);
      expect(report.getPromptId()).toBe(promptId);
      expect(report.getReporterId()).toBe(reporterId);
      expect(report.getReason()).toBe(reason);
      expect(report.getStatus()).toBe(status);
      expect(report.getCreatedAt()).toBe(createdAt);
    });
  });

  describe('getters', () => {
    it('should return the correct values', () => {
      // Arrange
      const id = PromptReportId.create(uuidv4());
      const promptId = PromptId.create(uuidv4());
      const reporterId = UserId.create(uuidv4());
      const reason = PromptReportReason.create('This is a valid reason');
      const status = PromptReportStatus.pending();
      const createdAt = new Date();

      const report = new PromptReport(
        id,
        promptId,
        reporterId,
        reason,
        status,
        createdAt
      );

      // Act & Assert
      expect(report.getId()).toBe(id);
      expect(report.getPromptId()).toBe(promptId);
      expect(report.getReporterId()).toBe(reporterId);
      expect(report.getReason()).toBe(reason);
      expect(report.getStatus()).toBe(status);
      expect(report.getCreatedAt()).toBe(createdAt);
    });
  });
});