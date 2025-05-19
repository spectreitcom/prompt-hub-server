import { PromptVisibility } from '../prompt-visibility.value-object';

describe('PromptVisibility', () => {
  describe('public', () => {
    it('should create a public visibility', () => {
      // Act
      const visibility = PromptVisibility.public();

      // Assert
      expect(visibility).toBeDefined();
      expect(visibility.getValue()).toBe('public');
      expect(visibility.isPublic()).toBe(true);
    });
  });

  describe('private', () => {
    it('should create a private visibility', () => {
      // Act
      const visibility = PromptVisibility.private();

      // Assert
      expect(visibility).toBeDefined();
      expect(visibility.getValue()).toBe('private');
      expect(visibility.isPublic()).toBe(false);
    });
  });

  describe('fromBoolean', () => {
    it('should create public visibility when true is passed', () => {
      // Act
      const visibility = PromptVisibility.fromBoolean(true);

      // Assert
      expect(visibility.getValue()).toBe('public');
      expect(visibility.isPublic()).toBe(true);
    });

    it('should create private visibility when false is passed', () => {
      // Act
      const visibility = PromptVisibility.fromBoolean(false);

      // Assert
      expect(visibility.getValue()).toBe('private');
      expect(visibility.isPublic()).toBe(false);
    });
  });

  describe('isPublic', () => {
    it('should return true for public visibility', () => {
      // Arrange
      const visibility = PromptVisibility.public();

      // Act
      const result = visibility.isPublic();

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for private visibility', () => {
      // Arrange
      const visibility = PromptVisibility.private();

      // Act
      const result = visibility.isPublic();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('getValue', () => {
    it('should return "public" for public visibility', () => {
      // Arrange
      const visibility = PromptVisibility.public();

      // Act
      const result = visibility.getValue();

      // Assert
      expect(result).toBe('public');
    });

    it('should return "private" for private visibility', () => {
      // Arrange
      const visibility = PromptVisibility.private();

      // Act
      const result = visibility.getValue();

      // Assert
      expect(result).toBe('private');
    });
  });

  describe('equals', () => {
    it('should return true when comparing two public visibilities', () => {
      // Arrange
      const visibility1 = PromptVisibility.public();
      const visibility2 = PromptVisibility.public();

      // Act
      const result = visibility1.equals(visibility2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true when comparing two private visibilities', () => {
      // Arrange
      const visibility1 = PromptVisibility.private();
      const visibility2 = PromptVisibility.private();

      // Act
      const result = visibility1.equals(visibility2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing public and private visibilities', () => {
      // Arrange
      const visibility1 = PromptVisibility.public();
      const visibility2 = PromptVisibility.private();

      // Act
      const result = visibility1.equals(visibility2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
