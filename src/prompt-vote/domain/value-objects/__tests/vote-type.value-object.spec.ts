import { VoteType } from '../vote-type.value-object';

describe('VoteType', () => {
  describe('up', () => {
    it('should create an UP vote type', () => {
      // Act
      const voteType = VoteType.up();

      // Assert
      expect(voteType).toBeDefined();
      expect(voteType.getValue()).toBe('UP');
      expect(voteType.isUp()).toBe(true);
      expect(voteType.isDown()).toBe(false);
    });
  });

  describe('down', () => {
    it('should create a DOWN vote type', () => {
      // Act
      const voteType = VoteType.down();

      // Assert
      expect(voteType).toBeDefined();
      expect(voteType.getValue()).toBe('DOWN');
      expect(voteType.isUp()).toBe(false);
      expect(voteType.isDown()).toBe(true);
    });
  });

  describe('create', () => {
    it('should create an UP vote type with "up" string', () => {
      // Act
      const voteType = VoteType.create('up');

      // Assert
      expect(voteType).toBeDefined();
      expect(voteType.getValue()).toBe('UP');
      expect(voteType.isUp()).toBe(true);
      expect(voteType.isDown()).toBe(false);
    });

    it('should create a DOWN vote type with "down" string', () => {
      // Act
      const voteType = VoteType.create('down');

      // Assert
      expect(voteType).toBeDefined();
      expect(voteType.getValue()).toBe('DOWN');
      expect(voteType.isUp()).toBe(false);
      expect(voteType.isDown()).toBe(true);
    });

    it('should be case insensitive', () => {
      // Act
      const upVoteType = VoteType.create('Up');
      const downVoteType = VoteType.create('DoWn');

      // Assert
      expect(upVoteType.isUp()).toBe(true);
      expect(downVoteType.isDown()).toBe(true);
    });

    it('should throw an error for invalid vote type', () => {
      // Act & Assert
      expect(() => VoteType.create('invalid')).toThrow('Invalid vote type');
      expect(() => VoteType.create('')).toThrow('Invalid vote type');
    });
  });

  describe('isUp', () => {
    it('should return true for UP vote type', () => {
      // Arrange
      const voteType = VoteType.up();

      // Act
      const result = voteType.isUp();

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for DOWN vote type', () => {
      // Arrange
      const voteType = VoteType.down();

      // Act
      const result = voteType.isUp();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('isDown', () => {
    it('should return true for DOWN vote type', () => {
      // Arrange
      const voteType = VoteType.down();

      // Act
      const result = voteType.isDown();

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for UP vote type', () => {
      // Arrange
      const voteType = VoteType.up();

      // Act
      const result = voteType.isDown();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('getValue', () => {
    it('should return "UP" for UP vote type', () => {
      // Arrange
      const voteType = VoteType.up();

      // Act
      const result = voteType.getValue();

      // Assert
      expect(result).toBe('UP');
    });

    it('should return "DOWN" for DOWN vote type', () => {
      // Arrange
      const voteType = VoteType.down();

      // Act
      const result = voteType.getValue();

      // Assert
      expect(result).toBe('DOWN');
    });
  });

  describe('equals', () => {
    it('should return true when comparing two UP vote types', () => {
      // Arrange
      const voteType1 = VoteType.up();
      const voteType2 = VoteType.up();

      // Act
      const result = voteType1.equals(voteType2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true when comparing two DOWN vote types', () => {
      // Arrange
      const voteType1 = VoteType.down();
      const voteType2 = VoteType.down();

      // Act
      const result = voteType1.equals(voteType2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing UP and DOWN vote types', () => {
      // Arrange
      const voteType1 = VoteType.up();
      const voteType2 = VoteType.down();

      // Act
      const result = voteType1.equals(voteType2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
