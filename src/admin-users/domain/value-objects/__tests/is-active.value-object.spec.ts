import { IsActive } from '../is-active.value-object';

describe('IsActive', () => {
  describe('active', () => {
    it('should create an active IsActive object', () => {
      // Act
      const isActive = IsActive.active();

      // Assert
      expect(isActive).toBeDefined();
      expect(isActive.getValue()).toBe(true);
    });
  });

  describe('create', () => {
    it('should create a valid IsActive with true value', () => {
      // Arrange
      const isActiveValue = true;

      // Act
      const isActive = IsActive.create(isActiveValue);

      // Assert
      expect(isActive).toBeDefined();
      expect(isActive.getValue()).toBe(true);
    });

    it('should create a valid IsActive with false value', () => {
      // Arrange
      const isActiveValue = false;

      // Act
      const isActive = IsActive.create(isActiveValue);

      // Assert
      expect(isActive).toBeDefined();
      expect(isActive.getValue()).toBe(false);
    });
  });

  describe('equals', () => {
    it('should return true for equal IsActive objects with true value', () => {
      // Arrange
      const isActive1 = IsActive.create(true);
      const isActive2 = IsActive.create(true);

      // Act & Assert
      expect(isActive1.equals(isActive2)).toBe(true);
    });

    it('should return true for equal IsActive objects with false value', () => {
      // Arrange
      const isActive1 = IsActive.create(false);
      const isActive2 = IsActive.create(false);

      // Act & Assert
      expect(isActive1.equals(isActive2)).toBe(true);
    });

    it('should return false for different IsActive objects', () => {
      // Arrange
      const isActive1 = IsActive.create(true);
      const isActive2 = IsActive.create(false);

      // Act & Assert
      expect(isActive1.equals(isActive2)).toBe(false);
    });
  });
});
