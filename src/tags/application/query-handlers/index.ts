import { GetPopularTagsQueryHandler } from './get-popular-tags.query-handler';
import { GetAllTagsQueryHandler } from './get-all-tags.query-handler';

export const QueryHandlers = [
  GetPopularTagsQueryHandler,
  GetAllTagsQueryHandler,
];

export { GetPopularTagsQueryHandler, GetAllTagsQueryHandler };

export * from './get-popular-tags.query-handler';
export * from './get-all-tags.query-handler';
