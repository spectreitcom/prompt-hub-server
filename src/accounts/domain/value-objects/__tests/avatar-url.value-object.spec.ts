import { AvatarUrl } from '../avatar-url.value-object';

describe('AvatarUrl', () => {
  describe('create', () => {
    it('should create a valid AvatarUrl with a valid URL', () => {
      // Arrange
      const validUrl = 'https://example.com/avatar.jpg';

      // Act
      const avatarUrl = AvatarUrl.create(validUrl);

      // Assert
      expect(avatarUrl).toBeDefined();
      expect(avatarUrl.getValue()).toBe(validUrl);
    });

    it('should create a valid AvatarUrl with an empty string', () => {
      // Arrange
      const emptyUrl = '';

      // Act
      const avatarUrl = AvatarUrl.create(emptyUrl);

      // Assert
      expect(avatarUrl).toBeDefined();
      expect(avatarUrl.getValue()).toBe('');
      expect(avatarUrl.isEmpty()).toBe(true);
    });

    it('should trim whitespace from the URL', () => {
      // Arrange
      const urlWithWhitespace = '  https://example.com/avatar.jpg  ';

      // Act
      const avatarUrl = AvatarUrl.create(urlWithWhitespace);

      // Assert
      expect(avatarUrl.getValue()).toBe('https://example.com/avatar.jpg');
    });

    it('should throw an error for an invalid URL format', () => {
      // Arrange
      const invalidUrl = 'not-a-url';

      // Act & Assert
      expect(() => AvatarUrl.create(invalidUrl)).toThrow();
    });

    it('should throw an error for a URL without http/https protocol', () => {
      // Arrange
      const invalidUrl = 'ftp://example.com/avatar.jpg';

      // Act & Assert
      expect(() => AvatarUrl.create(invalidUrl)).toThrow();
    });

    it('should throw an error for a URL not pointing to an image file', () => {
      // Arrange
      const invalidUrl = 'https://example.com/document.pdf';

      // Act & Assert
      expect(() => AvatarUrl.create(invalidUrl)).toThrow();
    });
  });

  describe('isEmpty', () => {
    it('should return true for an empty URL', () => {
      // Arrange
      const avatarUrl = AvatarUrl.create('');

      // Act & Assert
      expect(avatarUrl.isEmpty()).toBe(true);
    });

    it('should return false for a non-empty URL', () => {
      // Arrange
      const avatarUrl = AvatarUrl.create('https://example.com/avatar.jpg');

      // Act & Assert
      expect(avatarUrl.isEmpty()).toBe(false);
    });
  });

  describe('equals', () => {
    it('should return true for equal AvatarUrls', () => {
      // Arrange
      const url = 'https://example.com/avatar.jpg';
      const avatarUrl1 = AvatarUrl.create(url);
      const avatarUrl2 = AvatarUrl.create(url);

      // Act & Assert
      expect(avatarUrl1.equals(avatarUrl2)).toBe(true);
    });

    it('should return false for different AvatarUrls', () => {
      // Arrange
      const avatarUrl1 = AvatarUrl.create('https://example.com/avatar1.jpg');
      const avatarUrl2 = AvatarUrl.create('https://example.com/avatar2.jpg');

      // Act & Assert
      expect(avatarUrl1.equals(avatarUrl2)).toBe(false);
    });
  });
});
