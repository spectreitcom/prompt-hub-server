import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma';
import { ApiGatewayModule } from './api-gateway';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, ApiGatewayModule],
})
export class AppModule {}
