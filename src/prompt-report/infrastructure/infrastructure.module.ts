import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { PromptReportRepository } from '../application/ports';
import { PrismaPromptReportRepository } from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: PromptReportRepository,
      useClass: PrismaPromptReportRepository,
    },
  ],
  exports: [PromptReportRepository],
})
export class InfrastructureModule {}
