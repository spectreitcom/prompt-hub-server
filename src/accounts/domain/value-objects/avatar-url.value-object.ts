import { isURL } from 'class-validator';

export class AvatarUrl {
  private constructor(private readonly value: string) {}

  static create(url: string): AvatarUrl {
    // Allow empty avatar URL (user might not have an avatar)
    if (!url || url.trim() === '') {
      return new AvatarUrl('');
    }

    const trimmedUrl = url.trim();

    if (
      !isURL(trimmedUrl, {
        protocols: ['http', 'https'],
        require_protocol: true,
      })
    ) {
      throw new Error('Avatar URL must be a valid HTTP or HTTPS URL.');
    }

    // Check if URL points to an image file
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasImageExtension = imageExtensions.some((ext) =>
      trimmedUrl.toLowerCase().endsWith(ext),
    );

    if (!hasImageExtension) {
      throw new Error(
        'Avatar URL must point to an image file (jpg, jpeg, png, gif, webp, svg).',
      );
    }

    return new AvatarUrl(trimmedUrl);
  }

  getValue(): string {
    return this.value;
  }

  isEmpty(): boolean {
    return this.value === '';
  }

  equals(other: AvatarUrl): boolean {
    return this.value === other.getValue();
  }
}
