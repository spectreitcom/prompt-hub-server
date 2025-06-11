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
  VotingController,
  SearchController,
  NotificationsController,
  TagsController,
  StatisticsController,
  PromptReportController,
} from './controllers';
import { AuthService } from './services';
import { AuthGuard } from './guards';
import { DomainExceptionsFilter } from './filters';
import { TagsModule } from '../tags';
import { StatisticsModule } from '../statistics';

@Module({
  imports: [
    PromptHubModule,
    PromptReportModule,
    VotingModule,
    SearchModule,
    NotificationsModule,
    AccountsModule,
    FavoritesModule,
    TagsModule,
    StatisticsModule,
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
    VotingController,
    SearchController,
    NotificationsController,
    TagsController,
    StatisticsController,
    PromptReportController,
  ],
  providers: [AuthService, AuthGuard, DomainExceptionsFilter],
})
export class ApiGatewayModule {}
