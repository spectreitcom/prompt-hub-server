import { AggregateRoot } from '@nestjs/cqrs';
import {
  PromptContent,
  PromptId,
  PromptInstruction,
  PromptStatus,
  PromptTimestamps,
  PromptTitle,
  PromptVisibility,
  TagValue,
  UserId,
} from './value-objects';
import {
  PromptCopiedEvent,
  PromptCreatedEvent,
  PromptDeletedEvent,
  PromptPublishedEvent,
  PromptTagsReplacedEvent,
  PromptUpdatedEvent,
  PromptViewedEvent,
  PromptVisibilityChangedEvent,
} from './events';
import { randomUUID } from 'crypto';

export class Prompt extends AggregateRoot {
  private readonly id: PromptId;
  private title: PromptTitle;
  private content: PromptContent;
  private instruction: PromptInstruction;
  private status: PromptStatus;
  private visibility: PromptVisibility;
  private readonly authorId: UserId;
  private timestamps: PromptTimestamps;
  private tags: TagValue[];

  constructor(
    id: PromptId,
    title: PromptTitle,
    content: PromptContent,
    instruction: PromptInstruction,
    status: PromptStatus,
    visibility: PromptVisibility,
    authorId: UserId,
    timestamps: PromptTimestamps,
    tags: TagValue[] = [],
  ) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.instruction = instruction;
    this.status = status;
    this.visibility = visibility;
    this.authorId = authorId;
    this.timestamps = timestamps;
    this.tags = tags;
  }

  static createDraft(authorId: UserId): Prompt {
    const prompt = new Prompt(
      PromptId.create(randomUUID()),
      PromptTitle.create('Untitled Prompt'),
      PromptContent.create('Your prompt goes here...'),
      PromptInstruction.create(null),
      PromptStatus.draft(),
      PromptVisibility.public(),
      authorId,
      PromptTimestamps.createNew(),
    );

    prompt.apply(
      new PromptCreatedEvent(
        prompt.id,
        prompt.authorId,
        prompt.title,
        prompt.content,
        prompt.status,
        prompt.visibility,
        prompt.timestamps,
        prompt.instruction,
      ),
    );

    return prompt;
  }

  replaceTags(newTags: TagValue[]): void {
    // you can add max 5 tags
    if (newTags.length > 5) {
      throw new Error('You can add max 5 tags.');
    }

    // Store the previous tags before replacing them
    const previousTags = [...this.tags];

    // Get unique tags using the TagValue static method
    this.tags = TagValue.getUniqueTags(newTags);
    this.timestamps = this.timestamps.withUpdatedAt(new Date());

    this.apply(
      new PromptTagsReplacedEvent(
        this.id,
        this.authorId,
        previousTags,
        this.tags,
      ),
    );
  }

  updateContent(
    title: PromptTitle,
    content: PromptContent,
    instruction?: PromptInstruction,
  ): void {
    this.title = title;
    this.content = content;
    if (instruction) {
      this.instruction = instruction;
    }
    this.timestamps = this.timestamps.withUpdatedAt(new Date());
    this.apply(
      new PromptUpdatedEvent(
        this.id,
        this.authorId,
        this.title,
        this.content,
        this.timestamps,
        this.instruction,
      ),
    );
  }

  makePublished(): void {
    if (!this.status.isDraft()) {
      throw new Error('Only draft prompts can be published.');
    }

    this.status = PromptStatus.published();
    this.timestamps = this.timestamps.withUpdatedAt(new Date());
    this.apply(
      new PromptPublishedEvent(
        this.id,
        this.authorId,
        this.title,
        this.content,
        this.timestamps,
        this.status,
        this.tags,
      ),
    );
  }

  copy(byUserId?: UserId): void {
    if (byUserId && byUserId.equals(this.authorId)) return;
    if (!this.status.isPublished()) {
      throw new Error('Only published prompts can be copied.');
    }

    this.apply(new PromptCopiedEvent(this.id, this.authorId, byUserId));
  }

  makePrivate() {
    this.visibility = PromptVisibility.private();
    this.timestamps = this.timestamps.withUpdatedAt(new Date());
    this.apply(new PromptVisibilityChangedEvent(this.id, this.visibility));
  }

  makePublic() {
    this.visibility = PromptVisibility.public();
    this.timestamps = this.timestamps.withUpdatedAt(new Date());
    this.apply(new PromptVisibilityChangedEvent(this.id, this.visibility));
  }

  viewed(byUserId?: UserId): void {
    if (byUserId && byUserId.equals(this.authorId)) return;
    this.apply(new PromptViewedEvent(this.id, this.authorId, byUserId));
  }

  setVisibility(isPublic: boolean) {
    if (isPublic) {
      this.makePublic();
    } else {
      this.makePrivate();
    }
  }

  getId(): PromptId {
    return this.id;
  }

  getTitle(): PromptTitle {
    return this.title;
  }

  getContent(): PromptContent {
    return this.content;
  }

  getInstruction(): PromptInstruction {
    return this.instruction;
  }

  getStatus(): PromptStatus {
    return this.status;
  }

  getVisibility(): PromptVisibility {
    return this.visibility;
  }

  getAuthorId(): UserId {
    return this.authorId;
  }

  getTimestamps(): PromptTimestamps {
    return this.timestamps;
  }

  delete(): void {
    this.apply(new PromptDeletedEvent(this.id));
  }

  getTags(): TagValue[] {
    return this.tags;
  }
}
