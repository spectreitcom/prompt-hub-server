import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { NotificationId } from './value-objects';
import { UserId } from './value-objects';
import { NotificationType } from './value-objects';
import {
  NotificationCreatedEvent,
  NotificationReadEvent,
  NotificationUnreadEvent,
} from './events';

export class UserNotification extends AggregateRoot {
  private readonly id: NotificationId;
  private readonly userId: UserId;
  private readonly type: NotificationType;
  private readonly payload: Record<string, any>;
  private isRead: boolean;
  private readonly createdAt: Date;

  constructor(
    id: NotificationId,
    userId: UserId,
    type: NotificationType,
    payload: Record<string, any>,
    isRead: boolean,
    createdAt: Date,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.payload = payload;
    this.isRead = isRead;
    this.createdAt = createdAt;
  }

  static create(
    userId: UserId,
    type: NotificationType,
    payload: Record<string, any>,
  ): UserNotification {
    const id = NotificationId.create(randomUUID());
    const createdAt = new Date();
    const notification = new UserNotification(
      id,
      userId,
      type,
      payload,
      false,
      createdAt,
    );

    notification.apply(
      new NotificationCreatedEvent(id, userId, type, payload, createdAt),
    );

    return notification;
  }

  markAsRead(): void {
    if (this.isRead) {
      return; // Already read, no need to change state
    }

    this.isRead = true;
    this.apply(new NotificationReadEvent(this.id, this.userId));
  }

  markAsUnread(): void {
    if (!this.isRead) {
      return; // Already unread, no need to change state
    }

    this.isRead = false;
    this.apply(new NotificationUnreadEvent(this.id, this.userId));
  }

  getId(): NotificationId {
    return this.id;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getType(): NotificationType {
    return this.type;
  }

  getPayload(): Record<string, any> {
    return this.payload;
  }

  getIsRead(): boolean {
    return this.isRead;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
