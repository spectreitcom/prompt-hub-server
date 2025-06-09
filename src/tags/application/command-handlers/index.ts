import { CreateTagCommandHandler } from './create-tag.command-handler';
import { RemoveTagCommandHandler } from './remove-tag.command-handler';

export const CommandHandlers = [
  CreateTagCommandHandler,
  RemoveTagCommandHandler,
];
export * from './create-tag.command-handler';
export * from './remove-tag.command-handler';
