import { UserName } from '../user-name.value-object';

describe('UserName', () => {
  describe('create', () => {
    it('should create a valid UserName with a valid username', () => {
      // Arrange
      const validUsername = 'johndoe';

      // Act
      const userName = UserName.create(validUsername);

      // Assert
      expect(userName).toBeDefined();
      expect(userName.getValue()).toBe(validUsername);
    });

    it('should trim whitespace from the username', () => {
      // Arrange
      const usernameWithWhitespace = '  johndoe  ';

      // Act
      const userName = UserName.create(usernameWithWhitespace);

      // Assert
      expect(userName.getValue()).toBe('johndoe');
    });

    it('should accept usernames with underscores', () => {
      // Arrange
      const usernameWithUnderscore = 'john_doe';

      // Act
      const userName = UserName.create(usernameWithUnderscore);

      // Assert
      expect(userName.getValue()).toBe(usernameWithUnderscore);
    });

    it('should accept usernames with hyphens', () => {
      // Arrange
      const usernameWithHyphen = 'john-doe';

      // Act
      const userName = UserName.create(usernameWithHyphen);

      // Assert
      expect(userName.getValue()).toBe(usernameWithHyphen);
    });

    it('should throw an error for an empty username', () => {
      // Arrange
      const emptyUsername = '';

      // Act & Assert
      expect(() => UserName.create(emptyUsername)).toThrow();
    });

    it('should throw an error for a username with only whitespace', () => {
      // Arrange
      const whitespaceUsername = '   ';

      // Act & Assert
      expect(() => UserName.create(whitespaceUsername)).toThrow();
    });

    it('should throw an error for a username that is too short', () => {
      // Arrange
      const shortUsername = 'ab';

      // Act & Assert
      expect(() => UserName.create(shortUsername)).toThrow();
    });

    it('should throw an error for a username that is too long', () => {
      // Arrange
      const longUsername = 'a'.repeat(51);

      // Act & Assert
      expect(() => UserName.create(longUsername)).toThrow();
    });

    it('should throw an error for a username with invalid characters', () => {
      // Arrange
      const invalidUsername = 'john.doe';

      // Act & Assert
      expect(() => UserName.create(invalidUsername)).toThrow();
    });

    it('should throw an error for a username with special characters', () => {
      // Arrange
      const invalidUsername = 'john$doe';

      // Act & Assert
      expect(() => UserName.create(invalidUsername)).toThrow();
    });
  });

  describe('equals', () => {
    it('should return true for equal UserNames', () => {
      // Arrange
      const username = 'johndoe';
      const userName1 = UserName.create(username);
      const userName2 = UserName.create(username);

      // Act & Assert
      expect(userName1.equals(userName2)).toBe(true);
    });

    it('should return false for different UserNames', () => {
      // Arrange
      const userName1 = UserName.create('johndoe');
      const userName2 = UserName.create('janedoe');

      // Act & Assert
      expect(userName1.equals(userName2)).toBe(false);
    });

    it('should return true for equal UserNames with different whitespace', () => {
      // Arrange
      const userName1 = UserName.create('johndoe');
      const userName2 = UserName.create('  johndoe  ');

      // Act & Assert
      expect(userName1.equals(userName2)).toBe(true);
    });
  });
});
