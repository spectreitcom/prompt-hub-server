import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PromptHubModule } from '../prompt-hub';
import { PromptReportModule } from '../prompt-report';
import { VotingModule } from '../voting';
import { SearchModule } from '../search';
import { NotificationsModule } from '../notifications';
import { AccountsModule } from '../accounts';
import { FavoritesModule } from '../favorites';
import {
  AuthController,
  PromptHubController,
  CatalogController,
  FavoritesController,
} from './controllers';
import { AuthService } from './services';
import { AuthGuard } from './guards';

@Module({
  imports: [
    PromptHubModule,
    PromptReportModule,
    VotingModule,
    SearchModule,
    NotificationsModule,
    AccountsModule,
    FavoritesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AuthController,
    PromptHubController,
    CatalogController,
    FavoritesController,
  ],
  providers: [AuthService, AuthGuard],
})
export class ApiGatewayModule {}
