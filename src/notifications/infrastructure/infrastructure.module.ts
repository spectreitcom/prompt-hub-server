import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';

@Module({
  imports: [PrismaModule],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}