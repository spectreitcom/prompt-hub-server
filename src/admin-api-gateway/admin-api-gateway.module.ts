import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminUsersModule } from '../admin-users';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { AuthGuard } from './guards';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10d' },
      }),
      inject: [ConfigService],
    }),
    AdminUsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AdminApiGatewayModule {}
