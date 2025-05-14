import { PromptTitle } from '../prompt-title.value-object';

describe('PromptTitle', () => {
  describe('create', () => {
    it('should create a valid PromptTitle with a valid title', () => {
      // Arrange
      const validTitle = 'Valid Title';
      
      // Act
      const promptTitle = PromptTitle.create(validTitle);
      
      // Assert
      expect(promptTitle).toBeDefined();
      expect(promptTitle.getValue()).toBe(validTitle);
    });

    it('should trim the title before creating', () => {
      // Arrange
      const validTitle = 'Valid Title';
      const titleWithSpaces = `  ${validTitle}  `;
      
      // Act
      const promptTitle = PromptTitle.create(titleWithSpaces);
      
      // Assert
      expect(promptTitle.getValue()).toBe(validTitle);
    });

    it('should throw an error if the title is too short', () => {
      // Act & Assert
      expect(() => PromptTitle.create('ab')).toThrow('Prompt title must be between 3 and 100 characters.');
      expect(() => PromptTitle.create('  ab  ')).toThrow('Prompt title must be between 3 and 100 characters.');
    });

    it('should throw an error if the title is too long', () => {
      // Arrange
      const longTitle = 'a'.repeat(101);
      
      // Act & Assert
      expect(() => PromptTitle.create(longTitle)).toThrow('Prompt title must be between 3 and 100 characters.');
    });

    it('should accept a title with exactly 3 characters', () => {
      // Arrange
      const title = 'abc';
      
      // Act
      const promptTitle = PromptTitle.create(title);
      
      // Assert
      expect(promptTitle.getValue()).toBe(title);
    });

    it('should accept a title with exactly 100 characters', () => {
      // Arrange
      const title = 'a'.repeat(100);
      
      // Act
      const promptTitle = PromptTitle.create(title);
      
      // Assert
      expect(promptTitle.getValue()).toBe(title);
    });
  });

  describe('getValue', () => {
    it('should return the title value', () => {
      // Arrange
      const validTitle = 'Valid Title';
      const promptTitle = PromptTitle.create(validTitle);
      
      // Act
      const result = promptTitle.getValue();
      
      // Assert
      expect(result).toBe(validTitle);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same title', () => {
      // Arrange
      const validTitle = 'Valid Title';
      const promptTitle1 = PromptTitle.create(validTitle);
      const promptTitle2 = PromptTitle.create(validTitle);
      
      // Act
      const result = promptTitle1.equals(promptTitle2);
      
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different titles', () => {
      // Arrange
      const promptTitle1 = PromptTitle.create('Title 1');
      const promptTitle2 = PromptTitle.create('Title 2');
      
      // Act
      const result = promptTitle1.equals(promptTitle2);
      
      // Assert
      expect(result).toBe(false);
    });
  });
});