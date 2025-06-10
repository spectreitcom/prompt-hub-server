import { NotificationType } from '../notification-type.value-object';
import { 
  NotificationTypeEmptyException,
  NotificationTypeInvalidException
} from '../../exceptions';

describe('NotificationType', () => {
  describe('create', () => {
    it('should create a valid notification type', () => {
      const type = NotificationType.create('SIMPLE_INFO');
      expect(type).toBeDefined();
      expect(type.getValue()).toBe('SIMPLE_INFO');
    });

    it('should normalize the input', () => {
      const type = NotificationType.create('simple_info');
      expect(type.getValue()).toBe('SIMPLE_INFO');
    });

    it('should throw an error if the type is empty', () => {
      expect(() => NotificationType.create('')).toThrow(NotificationTypeEmptyException);
      expect(() => NotificationType.create('   ')).toThrow(NotificationTypeEmptyException);
      expect(() => NotificationType.create(null)).toThrow(NotificationTypeEmptyException);
      expect(() => NotificationType.create(undefined)).toThrow(NotificationTypeEmptyException);
    });

    it('should throw an error if the type is invalid', () => {
      expect(() => NotificationType.create('INVALID_TYPE')).toThrow(NotificationTypeInvalidException);
    });
  });

  describe('getValue', () => {
    it('should return the notification type value', () => {
      const type = NotificationType.create('SIMPLE_INFO');
      expect(type.getValue()).toBe('SIMPLE_INFO');
    });
  });

  describe('equals', () => {
    it('should return true for equal notification types', () => {
      const type1 = NotificationType.create('SIMPLE_INFO');
      const type2 = NotificationType.create('SIMPLE_INFO');
      expect(type1.equals(type2)).toBe(true);
    });

    it('should return false for different notification types', () => {
      // Since there's only one valid type currently, we can't test this case
      // This test is kept for future reference when more types are added
      const type1 = NotificationType.create('SIMPLE_INFO');
      // Mock a different type for testing
      const type2 = { getValue: () => 'DIFFERENT_TYPE' } as NotificationType;
      expect(type1.equals(type2)).toBe(false);
    });
  });

  describe('type checking methods', () => {
    it('should correctly identify SIMPLE_INFO type', () => {
      const type = NotificationType.create('SIMPLE_INFO');
      expect(type.isSimpleInfo()).toBe(true);
    });
  });
});
