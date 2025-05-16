import { Injectable } from '@nestjs/common';
import { SearchPromptEntryRepository } from '../../application';

@Injectable()
export class PrismaSearchPromptEntryRepository
  implements SearchPromptEntryRepository {}
