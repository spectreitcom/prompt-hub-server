import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_USER_AUTH, SWAGGER_ADMIN_AUTH } from './shared';
import { ValidationPipe } from '@nestjs/common';
import { DomainExceptionsFilter } from './api-gateway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Apply global exception filter for domain exceptions
  app.useGlobalFilters(new DomainExceptionsFilter());

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Prompt Hub API')
    .setDescription(
      'The Prompt Hub API provides endpoints for managing and sharing prompts. Users can create, publish, and manage prompts, organize them into catalogs, vote on prompts, report inappropriate content, and search for prompts.',
    )
    .setVersion('1.0.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('prompt-hub', 'Prompt management endpoints')
    .addTag('catalogs', 'Catalog management endpoints')
    .addTag('favorites', 'Favorite prompts management endpoints')
    .addTag('voting', 'Prompt voting endpoints')
    .addTag('search', 'Search endpoints')
    .addTag('tags', 'Tags management endpoints')
    .addTag('notifications', 'User notifications endpoints')
    .setContact(
      'Prompt Hub Team',
      'https://prompthub.example.com',
      'support@prompthub.example.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setTermsOfService('https://prompthub.example.com/terms')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'User',
        description: 'Enter user JWT token',
        in: 'header',
      },
      SWAGGER_USER_AUTH, // This name will be used for @ApiBearerAuth() decorator
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Admin',
        description: 'Enter admin JWT token',
        in: 'header',
      },
      SWAGGER_ADMIN_AUTH, // This name will be used for @ApiBearerAuth() decorator
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
