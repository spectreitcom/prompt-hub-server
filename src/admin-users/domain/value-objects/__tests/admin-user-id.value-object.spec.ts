import { AdminUserId } from '../admin-user-id.value-object';
import { randomUUID } from 'crypto';

describe('AdminUserId', () => {
  describe('create', () => {
    it('should create a valid AdminUserId with a valid UUID', () => {
      // Arrange
      const validUuid = randomUUID();

      // Act
      const adminUserId = AdminUserId.create(validUuid);

      // Assert
      expect(adminUserId).toBeDefined();
      expect(adminUserId.getValue()).toBe(validUuid);
    });

    it('should create a valid AdminUserId with no arguments', () => {
      // Act
      const adminUserId = AdminUserId.create();

      // Assert
      expect(adminUserId).toBeDefined();
      expect(adminUserId.getValue()).toBeDefined();
      expect(typeof adminUserId.getValue()).toBe('string');
    });

    it('should trim whitespace from the UUID', () => {
      // Arrange
      const validUuid = randomUUID();
      const paddedUuid = `  ${validUuid}  `;

      // Act
      const adminUserId = AdminUserId.create(paddedUuid);

      // Assert
      expect(adminUserId.getValue()).toBe(validUuid);
    });

    it('should throw an error for an empty UUID', () => {
      // Arrange
      const emptyUuid = '';

      // Act & Assert
      expect(() => AdminUserId.create(emptyUuid)).toThrow(
        'Admin User ID cannot be empty.',
      );
    });

    it('should throw an error for an invalid UUID', () => {
      // Arrange
      const invalidUuid = 'not-a-uuid';

      // Act & Assert
      expect(() => AdminUserId.create(invalidUuid)).toThrow(
        'Admin User ID must be a valid UUID.',
      );
    });
  });

  describe('equals', () => {
    it('should return true for equal AdminUserIds', () => {
      // Arrange
      const uuid = randomUUID();
      const adminUserId1 = AdminUserId.create(uuid);
      const adminUserId2 = AdminUserId.create(uuid);

      // Act & Assert
      expect(adminUserId1.equals(adminUserId2)).toBe(true);
    });

    it('should return false for different AdminUserIds', () => {
      // Arrange
      const adminUserId1 = AdminUserId.create(randomUUID());
      const adminUserId2 = AdminUserId.create(randomUUID());

      // Act & Assert
      expect(adminUserId1.equals(adminUserId2)).toBe(false);
    });
  });
});
