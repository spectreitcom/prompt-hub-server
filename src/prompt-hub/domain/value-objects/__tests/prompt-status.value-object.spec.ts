import { PromptStatus } from '../prompt-status.value-object';
import { PromptStatus as PromptStatusType } from '@prisma/client';

describe('PromptStatus', () => {
  describe('draft', () => {
    it('should create a draft status', () => {
      // Act
      const status = PromptStatus.draft();

      // Assert
      expect(status).toBeDefined();
      expect(status.getValue()).toBe(PromptStatusType.DRAFT);
      expect(status.isDraft()).toBe(true);
      expect(status.isPublished()).toBe(false);
    });
  });

  describe('published', () => {
    it('should create a published status', () => {
      // Act
      const status = PromptStatus.published();

      // Assert
      expect(status).toBeDefined();
      expect(status.getValue()).toBe(PromptStatusType.PUBLISHED);
      expect(status.isDraft()).toBe(false);
      expect(status.isPublished()).toBe(true);
    });
  });

  describe('getValue', () => {
    it('should return DRAFT for draft status', () => {
      // Arrange
      const status = PromptStatus.draft();

      // Act
      const result = status.getValue();

      // Assert
      expect(result).toBe(PromptStatusType.DRAFT);
    });

    it('should return PUBLISHED for published status', () => {
      // Arrange
      const status = PromptStatus.published();

      // Act
      const result = status.getValue();

      // Assert
      expect(result).toBe(PromptStatusType.PUBLISHED);
    });
  });

  describe('isDraft', () => {
    it('should return true for draft status', () => {
      // Arrange
      const status = PromptStatus.draft();

      // Act
      const result = status.isDraft();

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for published status', () => {
      // Arrange
      const status = PromptStatus.published();

      // Act
      const result = status.isDraft();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('isPublished', () => {
    it('should return true for published status', () => {
      // Arrange
      const status = PromptStatus.published();

      // Act
      const result = status.isPublished();

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for draft status', () => {
      // Arrange
      const status = PromptStatus.draft();

      // Act
      const result = status.isPublished();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('equals', () => {
    it('should return true when comparing two draft statuses', () => {
      // Arrange
      const status1 = PromptStatus.draft();
      const status2 = PromptStatus.draft();

      // Act
      const result = status1.equals(status2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true when comparing two published statuses', () => {
      // Arrange
      const status1 = PromptStatus.published();
      const status2 = PromptStatus.published();

      // Act
      const result = status1.equals(status2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing draft and published statuses', () => {
      // Arrange
      const status1 = PromptStatus.draft();
      const status2 = PromptStatus.published();

      // Act
      const result = status1.equals(status2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
