import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminUsersModule } from '../admin-users';
import { AccountsModule } from '../accounts';
import { TagsModule } from '../tags';
import { AuthController, UsersController, TagsController } from './controllers';
import { AuthService } from './services';
import { AuthGuard } from './guards';
import { DomainExceptionsFilter } from './filters';

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
    TagsModule,
  ],
  controllers: [AuthController, UsersController, TagsController],
  providers: [AuthService, AuthGuard, DomainExceptionsFilter],
})
export class AdminApiGatewayModule {}
