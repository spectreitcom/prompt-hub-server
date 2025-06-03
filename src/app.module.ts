import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma';
import { ApiGatewayModule } from './api-gateway';
import { validate } from './config/env.validation';
import { AdminUsersModule } from './admin-users/admin-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    PrismaModule,
    ApiGatewayModule,
    AdminUsersModule,
  ],
})
export class AppModule {}
