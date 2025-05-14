import { PromptContent } from '../prompt-content.value-object';

describe('PromptContent', () => {
  describe('create', () => {
    it('should create a valid PromptContent with valid content', () => {
      // Arrange
      const validContent = 'This is a valid prompt content.';

      // Act
      const promptContent = PromptContent.create(validContent);

      // Assert
      expect(promptContent).toBeDefined();
      expect(promptContent.getValue()).toBe(validContent);
    });

    it('should trim the content before creating', () => {
      // Arrange
      const validContent = 'This is a valid prompt content.';
      const contentWithSpaces = `  ${validContent}  `;

      // Act
      const promptContent = PromptContent.create(contentWithSpaces);

      // Assert
      expect(promptContent.getValue()).toBe(validContent);
    });

    it('should throw an error if the content is empty', () => {
      // Act & Assert
      expect(() => PromptContent.create('')).toThrow(
        'Prompt content cannot be empty.',
      );
      expect(() => PromptContent.create('   ')).toThrow(
        'Prompt content cannot be empty.',
      );
    });

    it('should throw an error if the content is too long', () => {
      // Arrange
      const longContent = 'a'.repeat(5001);

      // Act & Assert
      expect(() => PromptContent.create(longContent)).toThrow(
        'Prompt content is too long.',
      );
    });

    it('should accept content with exactly 5000 characters', () => {
      // Arrange
      const content = 'a'.repeat(5000);

      // Act
      const promptContent = PromptContent.create(content);

      // Assert
      expect(promptContent.getValue()).toBe(content);
    });
  });

  describe('getValue', () => {
    it('should return the content value', () => {
      // Arrange
      const validContent = 'This is a valid prompt content.';
      const promptContent = PromptContent.create(validContent);

      // Act
      const result = promptContent.getValue();

      // Assert
      expect(result).toBe(validContent);
    });
  });

  describe('getPreview', () => {
    it('should return the full content if it is less than 160 characters', () => {
      // Arrange
      const shortContent = 'This is a short content.';
      const promptContent = PromptContent.create(shortContent);

      // Act
      const result = promptContent.getPreview();

      // Assert
      expect(result).toBe(shortContent);
    });

    it('should return the first 160 characters with ellipsis if content is longer', () => {
      // Arrange
      const longContent = 'a'.repeat(200);
      const promptContent = PromptContent.create(longContent);

      // Act
      const result = promptContent.getPreview();

      // Assert
      expect(result).toBe('a'.repeat(160) + '...');
      expect(result.length).toBe(163); // 160 characters + 3 for ellipsis
    });

    it('should return exactly 160 characters without ellipsis if content is exactly 160 characters', () => {
      // Arrange
      const content = 'a'.repeat(160);
      const promptContent = PromptContent.create(content);

      // Act
      const result = promptContent.getPreview();

      // Assert
      expect(result).toBe(content);
      expect(result.length).toBe(160);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same content', () => {
      // Arrange
      const validContent = 'This is a valid prompt content.';
      const promptContent1 = PromptContent.create(validContent);
      const promptContent2 = PromptContent.create(validContent);

      // Act
      const result = promptContent1.equals(promptContent2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different contents', () => {
      // Arrange
      const promptContent1 = PromptContent.create('Content 1');
      const promptContent2 = PromptContent.create('Content 2');

      // Act
      const result = promptContent1.equals(promptContent2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
