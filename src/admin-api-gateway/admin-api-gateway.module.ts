import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminUsersModule } from '../admin-users';
import { AccountsModule } from '../accounts';
import { AuthController, UsersController } from './controllers';
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
    AccountsModule,
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, AuthGuard],
})
export class AdminApiGatewayModule {}
