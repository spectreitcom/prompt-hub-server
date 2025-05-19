import { AggregateRoot } from '@nestjs/cqrs';
import {
  PromptContent,
  PromptId,
  PromptStatus,
  PromptTimestamps,
  PromptTitle,
  PromptVisibility,
  UserId,
} from './value-objects';
import {
  PromptCopiedEvent,
  PromptDeletedEvent,
  PromptPublishedEvent,
  PromptUpdatedEvent,
  PromptVisibilityChangedEvent,
} from './events';
import { randomUUID } from 'crypto';

export class Prompt extends AggregateRoot {
  private readonly id: PromptId;
  private title: PromptTitle;
  private content: PromptContent;
  private status: PromptStatus;
  private visibility: PromptVisibility;
  private readonly authorId: UserId;
  private timestamps: PromptTimestamps;

  constructor(
    id: PromptId,
    title: PromptTitle,
    content: PromptContent,
    status: PromptStatus,
    visibility: PromptVisibility,
    authorId: UserId,
    timestamps: PromptTimestamps,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.status = status;
    this.visibility = visibility;
    this.authorId = authorId;
    this.timestamps = timestamps;
  }

  static createDraft(authorId: UserId): Prompt {
    return new Prompt(
      PromptId.create(randomUUID()),
      PromptTitle.create('Untitled Prompt'),
      PromptContent.create(''),
      PromptStatus.draft(),
      PromptVisibility.private(),
      authorId,
      PromptTimestamps.createNew(),
    );
  }

  updateContent(title: PromptTitle, content: PromptContent): void {
    this.title = title;
    this.content = content;
    this.timestamps = this.timestamps.withUpdatedAt(new Date());
    this.apply(
      new PromptUpdatedEvent(
        this.id,
        this.authorId,
        this.title,
        this.content,
        this.timestamps,
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
      ),
    );
  }

  copy(byUserId: UserId): void {
    if (!this.status.isPublished()) {
      throw new Error('Only published prompts can be copied.');
    }

    this.apply(new PromptCopiedEvent(this.id, byUserId));
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

  viewed(byUserId: UserId) {
    // todo: emit an event that prompt was viewed
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
}
