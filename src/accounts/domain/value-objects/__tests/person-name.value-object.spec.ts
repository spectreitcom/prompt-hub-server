import { PersonName } from '../person-name.value-object';

describe('PersonName', () => {
  describe('create', () => {
    it('should create a valid PersonName with a valid name', () => {
      // Arrange
      const validName = 'John Doe';

      // Act
      const personName = PersonName.create(validName);

      // Assert
      expect(personName).toBeDefined();
      expect(personName.getValue()).toBe(validName);
    });

    it('should trim whitespace from the name', () => {
      // Arrange
      const nameWithWhitespace = '  John Doe  ';

      // Act
      const personName = PersonName.create(nameWithWhitespace);

      // Assert
      expect(personName.getValue()).toBe('John Doe');
    });

    it('should accept names with hyphens', () => {
      // Arrange
      const nameWithHyphen = 'Mary-Jane Smith';

      // Act
      const personName = PersonName.create(nameWithHyphen);

      // Assert
      expect(personName.getValue()).toBe(nameWithHyphen);
    });

    it('should accept names with apostrophes', () => {
      // Arrange
      const nameWithApostrophe = "John O'Connor";

      // Act
      const personName = PersonName.create(nameWithApostrophe);

      // Assert
      expect(personName.getValue()).toBe(nameWithApostrophe);
    });

    it('should throw an error for an empty name', () => {
      // Arrange
      const emptyName = '';

      // Act & Assert
      expect(() => PersonName.create(emptyName)).toThrow();
    });

    it('should throw an error for a name with only whitespace', () => {
      // Arrange
      const whitespaceName = '   ';

      // Act & Assert
      expect(() => PersonName.create(whitespaceName)).toThrow();
    });

    it('should throw an error for a name that is too short', () => {
      // Arrange
      const shortName = 'A';

      // Act & Assert
      expect(() => PersonName.create(shortName)).toThrow();
    });

    it('should throw an error for a name that is too long', () => {
      // Arrange
      const longName = 'A'.repeat(101);

      // Act & Assert
      expect(() => PersonName.create(longName)).toThrow();
    });

    it('should throw an error for a name with invalid characters', () => {
      // Arrange
      const invalidName = 'John Doe 123';

      // Act & Assert
      expect(() => PersonName.create(invalidName)).toThrow();
    });

    it('should throw an error for a name with special characters', () => {
      // Arrange
      const invalidName = 'John Doe!';

      // Act & Assert
      expect(() => PersonName.create(invalidName)).toThrow();
    });
  });

  describe('equals', () => {
    it('should return true for equal PersonNames', () => {
      // Arrange
      const name = 'John Doe';
      const personName1 = PersonName.create(name);
      const personName2 = PersonName.create(name);

      // Act & Assert
      expect(personName1.equals(personName2)).toBe(true);
    });

    it('should return false for different PersonNames', () => {
      // Arrange
      const personName1 = PersonName.create('John Doe');
      const personName2 = PersonName.create('Jane Smith');

      // Act & Assert
      expect(personName1.equals(personName2)).toBe(false);
    });

    it('should return true for equal PersonNames with different whitespace', () => {
      // Arrange
      const personName1 = PersonName.create('John Doe');
      const personName2 = PersonName.create('  John Doe  ');

      // Act & Assert
      expect(personName1.equals(personName2)).toBe(true);
    });
  });
});
