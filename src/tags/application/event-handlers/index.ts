import { TagCreatedEventHandler } from './tag-created.event-handler';
import { TagActivatedEventHandler } from './tag-activated.event-handler';
import { TagDeactivatedEventHandler } from './tag-deactivated.event-handler';
import { PromptTagsReplacedEventHandler } from './prompt-tags-replaced.event-handler';

export * from './tag-created.event-handler';
export * from './tag-activated.event-handler';
export * from './tag-deactivated.event-handler';
export * from './prompt-tags-replaced.event-handler';

export const EventHandlers = [
  TagCreatedEventHandler,
  TagActivatedEventHandler,
  TagDeactivatedEventHandler,
  PromptTagsReplacedEventHandler,
];
