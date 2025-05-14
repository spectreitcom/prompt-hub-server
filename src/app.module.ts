import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
})
export class AppModule {}
