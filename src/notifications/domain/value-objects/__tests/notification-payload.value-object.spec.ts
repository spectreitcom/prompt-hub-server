import { NotificationPayload } from '../notification-payload.value-object';

describe('NotificationPayload', () => {
  describe('create', () => {
    it('should create a valid notification payload with title only', () => {
      const payload = NotificationPayload.create('Test Title');
      expect(payload).toBeDefined();
      expect(payload.getTitle()).toBe('Test Title');
      expect(payload.getContent()).toBeUndefined();
      expect(payload.hasContent()).toBe(false);
    });

    it('should create a valid notification payload with title and content', () => {
      const payload = NotificationPayload.create('Test Title', 'Test Content');
      expect(payload).toBeDefined();
      expect(payload.getTitle()).toBe('Test Title');
      expect(payload.getContent()).toBe('Test Content');
      expect(payload.hasContent()).toBe(true);
    });

    it('should trim the title and content', () => {
      const payload = NotificationPayload.create(
        '  Test Title  ',
        '  Test Content  ',
      );
      expect(payload.getTitle()).toBe('Test Title');
      expect(payload.getContent()).toBe('Test Content');
    });

    it('should throw an error if the title is empty', () => {
      expect(() => NotificationPayload.create('')).toThrow(
        'Notification title cannot be empty.',
      );
      expect(() => NotificationPayload.create('   ')).toThrow(
        'Notification title cannot be empty.',
      );
      expect(() => NotificationPayload.create(null)).toThrow(
        'Notification title cannot be empty.',
      );
      expect(() => NotificationPayload.create(undefined)).toThrow(
        'Notification title cannot be empty.',
      );
    });

    it('should throw an error if the content is provided but empty', () => {
      expect(() => NotificationPayload.create('Test Title', '')).toThrow(
        'Notification content must be a non-empty string if provided.',
      );
      expect(() => NotificationPayload.create('Test Title', '   ')).toThrow(
        'Notification content must be a non-empty string if provided.',
      );
    });
  });

  describe('getTitle', () => {
    it('should return the notification title', () => {
      const payload = NotificationPayload.create('Test Title');
      expect(payload.getTitle()).toBe('Test Title');
    });
  });

  describe('getContent', () => {
    it('should return the notification content if provided', () => {
      const payload = NotificationPayload.create('Test Title', 'Test Content');
      expect(payload.getContent()).toBe('Test Content');
    });

    it('should return undefined if content is not provided', () => {
      const payload = NotificationPayload.create('Test Title');
      expect(payload.getContent()).toBeUndefined();
    });
  });

  describe('hasContent', () => {
    it('should return true if content is provided', () => {
      const payload = NotificationPayload.create('Test Title', 'Test Content');
      expect(payload.hasContent()).toBe(true);
    });

    it('should return false if content is not provided', () => {
      const payload = NotificationPayload.create('Test Title');
      expect(payload.hasContent()).toBe(false);
    });
  });

  describe('equals', () => {
    it('should return true for equal notification payloads with title only', () => {
      const payload1 = NotificationPayload.create('Test Title');
      const payload2 = NotificationPayload.create('Test Title');
      expect(payload1.equals(payload2)).toBe(true);
    });

    it('should return true for equal notification payloads with title and content', () => {
      const payload1 = NotificationPayload.create('Test Title', 'Test Content');
      const payload2 = NotificationPayload.create('Test Title', 'Test Content');
      expect(payload1.equals(payload2)).toBe(true);
    });

    it('should return false for different titles', () => {
      const payload1 = NotificationPayload.create('Test Title 1');
      const payload2 = NotificationPayload.create('Test Title 2');
      expect(payload1.equals(payload2)).toBe(false);
    });

    it('should return false for different contents', () => {
      const payload1 = NotificationPayload.create(
        'Test Title',
        'Test Content 1',
      );
      const payload2 = NotificationPayload.create(
        'Test Title',
        'Test Content 2',
      );
      expect(payload1.equals(payload2)).toBe(false);
    });

    it('should return false when one has content and the other does not', () => {
      const payload1 = NotificationPayload.create('Test Title', 'Test Content');
      const payload2 = NotificationPayload.create('Test Title');
      expect(payload1.equals(payload2)).toBe(false);
    });
  });

  describe('toObject', () => {
    it('should return an object with title and content when content is provided', () => {
      const payload = NotificationPayload.create('Test Title', 'Test Content');
      const obj = payload.toObject();
      expect(obj).toEqual({
        title: 'Test Title',
        content: 'Test Content',
      });
    });

    it('should return an object with title and undefined content when content is not provided', () => {
      const payload = NotificationPayload.create('Test Title');
      const obj = payload.toObject();
      expect(obj).toEqual({
        title: 'Test Title',
        content: undefined,
      });
    });
  });
});
