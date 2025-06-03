import { IsSuperuser } from '../is-superuser.value-object';

describe('IsSuperuser', () => {
  describe('superuser', () => {
    it('should create a superuser IsSuperuser object', () => {
      // Act
      const isSuperuser = IsSuperuser.superuser();

      // Assert
      expect(isSuperuser).toBeDefined();
      expect(isSuperuser.getValue()).toBe(true);
    });
  });

  describe('notSuperuser', () => {
    it('should create a non-superuser IsSuperuser object', () => {
      // Act
      const isSuperuser = IsSuperuser.notSuperuser();

      // Assert
      expect(isSuperuser).toBeDefined();
      expect(isSuperuser.getValue()).toBe(false);
    });
  });

  describe('create', () => {
    it('should create a valid IsSuperuser with true value', () => {
      // Arrange
      const isSuperuserValue = true;

      // Act
      const isSuperuser = IsSuperuser.create(isSuperuserValue);

      // Assert
      expect(isSuperuser).toBeDefined();
      expect(isSuperuser.getValue()).toBe(true);
    });

    it('should create a valid IsSuperuser with false value', () => {
      // Arrange
      const isSuperuserValue = false;

      // Act
      const isSuperuser = IsSuperuser.create(isSuperuserValue);

      // Assert
      expect(isSuperuser).toBeDefined();
      expect(isSuperuser.getValue()).toBe(false);
    });
  });

  describe('equals', () => {
    it('should return true for equal IsSuperuser objects with true value', () => {
      // Arrange
      const isSuperuser1 = IsSuperuser.create(true);
      const isSuperuser2 = IsSuperuser.create(true);

      // Act & Assert
      expect(isSuperuser1.equals(isSuperuser2)).toBe(true);
    });

    it('should return true for equal IsSuperuser objects with false value', () => {
      // Arrange
      const isSuperuser1 = IsSuperuser.create(false);
      const isSuperuser2 = IsSuperuser.create(false);

      // Act & Assert
      expect(isSuperuser1.equals(isSuperuser2)).toBe(true);
    });

    it('should return false for different IsSuperuser objects', () => {
      // Arrange
      const isSuperuser1 = IsSuperuser.create(true);
      const isSuperuser2 = IsSuperuser.create(false);

      // Act & Assert
      expect(isSuperuser1.equals(isSuperuser2)).toBe(false);
    });
  });
});
