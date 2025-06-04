import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma';
import { ApiGatewayModule } from './api-gateway';
import { AdminApiGatewayModule } from './admin-api-gateway';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    PrismaModule,
    ApiGatewayModule,
    AdminApiGatewayModule,
  ],
})
export class AppModule {}
