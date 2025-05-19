import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PromptHubModule } from '../prompt-hub';
import { PromptReportModule } from '../prompt-report';
import { VotingModule } from '../voting';
import { SearchModule } from '../search';
import { NotificationsModule } from '../notifications';
import { AccountsModule } from '../accounts';
import { AuthController } from './controllers';
import { AuthService } from './services';

@Module({
  imports: [
    PromptHubModule,
    PromptReportModule,
    VotingModule,
    SearchModule,
    NotificationsModule,
    AccountsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class ApiGatewayModule {}
