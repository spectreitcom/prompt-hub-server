import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import * as EventHandlers from './application/event-handlers';
import { InfrastructureModule as AccountsInfrastructureModule } from '../accounts/infrastructure';

@Module({
  imports: [InfrastructureModule, CqrsModule, AccountsInfrastructureModule],
  providers: [...Object.values(EventHandlers)],
  exports: [],
})
export class SearchModule {}
