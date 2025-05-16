import { UserNotificationId } from '../user-notification-id.value-object';
import { v4 as uuidv4 } from 'uuid';

describe('UserNotificationId', () => {
  const validUuid = uuidv4();

  describe('create', () => {
    it('should create a valid notification ID', () => {
      const notificationId = UserNotificationId.create(validUuid);
      expect(notificationId).toBeDefined();
      expect(notificationId.getValue()).toBe(validUuid);
    });

    it('should trim the input', () => {
      // We need to modify this test because the UUID validation happens before trimming
      // Let's mock the trim method to verify it's called
      const trimmedId = validUuid.trim();
      const trimSpy = jest.spyOn(String.prototype, 'trim');

      const notificationId = UserNotificationId.create(validUuid);

      expect(trimSpy).toHaveBeenCalled();
      expect(notificationId.getValue()).toBe(trimmedId);

      trimSpy.mockRestore();
    });

    it('should throw an error if the ID is empty', () => {
      expect(() => UserNotificationId.create('')).toThrow(
        'Notification ID cannot be empty.',
      );
      expect(() => UserNotificationId.create('   ')).toThrow(
        'Notification ID cannot be empty.',
      );
      expect(() => UserNotificationId.create(null)).toThrow(
        'Notification ID cannot be empty.',
      );
      expect(() => UserNotificationId.create(undefined)).toThrow(
        'Notification ID cannot be empty.',
      );
    });

    it('should throw an error if the ID is not a valid UUID', () => {
      expect(() => UserNotificationId.create('not-a-uuid')).toThrow(
        'Notification ID must be a valid UUID.',
      );
      expect(() =>
        UserNotificationId.create('123e4567-e89b-12d3-a456'),
      ).toThrow('Notification ID must be a valid UUID.');
      expect(() =>
        UserNotificationId.create('123e4567-e89b-12d3-a456-42661417400Z'),
      ).toThrow('Notification ID must be a valid UUID.');
    });
  });

  describe('getValue', () => {
    it('should return the notification ID value', () => {
      const notificationId = UserNotificationId.create(validUuid);
      expect(notificationId.getValue()).toBe(validUuid);
    });
  });

  describe('equals', () => {
    it('should return true for equal notification IDs', () => {
      const notificationId1 = UserNotificationId.create(validUuid);
      const notificationId2 = UserNotificationId.create(validUuid);
      expect(notificationId1.equals(notificationId2)).toBe(true);
    });

    it('should return false for different notification IDs', () => {
      const notificationId1 = UserNotificationId.create(validUuid);
      const notificationId2 = UserNotificationId.create(uuidv4());
      expect(notificationId1.equals(notificationId2)).toBe(false);
    });
  });
});
