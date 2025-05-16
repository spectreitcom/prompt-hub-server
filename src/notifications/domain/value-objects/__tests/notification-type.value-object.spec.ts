import { NotificationType } from '../notification-type.value-object';

describe('NotificationType', () => {
  describe('create', () => {
    it('should create a valid notification type', () => {
      const type = NotificationType.create('PROMPT_PUBLISHED');
      expect(type).toBeDefined();
      expect(type.getValue()).toBe('PROMPT_PUBLISHED');
    });

    it('should normalize the input', () => {
      const type = NotificationType.create('prompt_published');
      expect(type.getValue()).toBe('PROMPT_PUBLISHED');
    });

    it('should throw an error if the type is empty', () => {
      expect(() => NotificationType.create('')).toThrow(
        'Notification type cannot be empty.',
      );
      expect(() => NotificationType.create('   ')).toThrow(
        'Notification type cannot be empty.',
      );
      expect(() => NotificationType.create(null)).toThrow(
        'Notification type cannot be empty.',
      );
      expect(() => NotificationType.create(undefined)).toThrow(
        'Notification type cannot be empty.',
      );
    });

    it('should throw an error if the type is invalid', () => {
      expect(() => NotificationType.create('INVALID_TYPE')).toThrow(
        'Invalid notification type.',
      );
    });
  });

  describe('getValue', () => {
    it('should return the notification type value', () => {
      const type = NotificationType.create('PROMPT_PUBLISHED');
      expect(type.getValue()).toBe('PROMPT_PUBLISHED');
    });
  });

  describe('equals', () => {
    it('should return true for equal notification types', () => {
      const type1 = NotificationType.create('PROMPT_PUBLISHED');
      const type2 = NotificationType.create('PROMPT_PUBLISHED');
      expect(type1.equals(type2)).toBe(true);
    });

    it('should return false for different notification types', () => {
      const type1 = NotificationType.create('PROMPT_PUBLISHED');
      const type2 = NotificationType.create('PROMPT_LIKED');
      expect(type1.equals(type2)).toBe(false);
    });
  });

  describe('type checking methods', () => {
    it('should correctly identify PROMPT_PUBLISHED type', () => {
      const type = NotificationType.create('PROMPT_PUBLISHED');
      expect(type.isPromptPublished()).toBe(true);
      expect(type.isPromptLiked()).toBe(false);
      expect(type.isPromptCommented()).toBe(false);
      expect(type.isPromptReported()).toBe(false);
      expect(type.isUserMentioned()).toBe(false);
    });

    it('should correctly identify PROMPT_LIKED type', () => {
      const type = NotificationType.create('PROMPT_LIKED');
      expect(type.isPromptPublished()).toBe(false);
      expect(type.isPromptLiked()).toBe(true);
      expect(type.isPromptCommented()).toBe(false);
      expect(type.isPromptReported()).toBe(false);
      expect(type.isUserMentioned()).toBe(false);
    });

    it('should correctly identify PROMPT_COMMENTED type', () => {
      const type = NotificationType.create('PROMPT_COMMENTED');
      expect(type.isPromptPublished()).toBe(false);
      expect(type.isPromptLiked()).toBe(false);
      expect(type.isPromptCommented()).toBe(true);
      expect(type.isPromptReported()).toBe(false);
      expect(type.isUserMentioned()).toBe(false);
    });

    it('should correctly identify PROMPT_REPORTED type', () => {
      const type = NotificationType.create('PROMPT_REPORTED');
      expect(type.isPromptPublished()).toBe(false);
      expect(type.isPromptLiked()).toBe(false);
      expect(type.isPromptCommented()).toBe(false);
      expect(type.isPromptReported()).toBe(true);
      expect(type.isUserMentioned()).toBe(false);
    });

    it('should correctly identify USER_MENTIONED type', () => {
      const type = NotificationType.create('USER_MENTIONED');
      expect(type.isPromptPublished()).toBe(false);
      expect(type.isPromptLiked()).toBe(false);
      expect(type.isPromptCommented()).toBe(false);
      expect(type.isPromptReported()).toBe(false);
      expect(type.isUserMentioned()).toBe(true);
    });
  });
});
