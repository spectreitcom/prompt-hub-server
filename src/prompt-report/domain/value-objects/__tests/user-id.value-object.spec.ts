import { UserId } from '../user-id.value-object';
import { v4 as uuidv4 } from 'uuid';

describe('UserId', () => {
  describe('create', () => {
    it('should create a valid UserId with a valid UUID', () => {
      // Arrange
      const uuid = uuidv4();

      // Act
      const userId = UserId.create(uuid);

      // Assert
      expect(userId).toBeDefined();
      expect(userId.getValue()).toBe(uuid);
    });

    it('should store the UUID correctly', () => {
      // Arrange
      const uuid = uuidv4();

      // Act
      const userId = UserId.create(uuid);

      // Assert
      expect(userId.getValue()).toBe(uuid);
    });

    it('should throw an error if the UUID is empty', () => {
      // Act & Assert
      expect(() => UserId.create('')).toThrow('User ID cannot be empty.');
      expect(() => UserId.create('   ')).toThrow('User ID cannot be empty.');
    });

    it('should throw an error if the UUID is invalid', () => {
      // Act & Assert
      expect(() => UserId.create('invalid-uuid')).toThrow(
        'User ID must be a valid UUID.',
      );
      expect(() =>
        UserId.create('123e4567-e89b-12d3-a456-42661417400'),
      ).toThrow('User ID must be a valid UUID.');
    });
  });

  describe('getValue', () => {
    it('should return the UUID value', () => {
      // Arrange
      const uuid = uuidv4();
      const userId = UserId.create(uuid);

      // Act
      const result = userId.getValue();

      // Assert
      expect(result).toBe(uuid);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same UserId', () => {
      // Arrange
      const uuid = uuidv4();
      const userId1 = UserId.create(uuid);
      const userId2 = UserId.create(uuid);

      // Act
      const result = userId1.equals(userId2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different UserIds', () => {
      // Arrange
      const userId1 = UserId.create(uuidv4());
      const userId2 = UserId.create(uuidv4());

      // Act
      const result = userId1.equals(userId2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
