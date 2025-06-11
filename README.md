# Prompt Hub Server

A NestJS-based backend application for managing and sharing prompts. This application allows users to create, publish, and manage prompts, organize them into catalogs, vote on prompts, report inappropriate content, and search for prompts.

## Project Overview

Prompt Hub Server provides a robust API for client applications to interact with the prompt management system. The application uses modern TypeScript features and follows industry best practices for backend development. It integrates with Google authentication for user management and uses Prisma ORM for database access.

## Architecture

The application follows a clean architecture pattern with Domain-Driven Design (DDD) principles and Command Query Responsibility Segregation (CQRS) pattern.

### Key Architectural Components:

1. **API Gateway**: Acts as an entry point for all API requests and routes them to the appropriate domain modules. Includes controllers, DTOs, decorators, guards, and services for handling HTTP requests and responses.
2. **Domain Modules**: Separate modules for different domains (accounts, favorites, prompt-hub, notifications, prompt-report, search, voting, etc.).
3. **Clean Architecture Layers**:
   - **Domain Layer**: Contains domain models, entities, value objects, and domain events.
   - **Application Layer**: Contains application services, commands, command handlers, events, and event handlers.
   - **Infrastructure Layer**: Contains implementations of repositories and other infrastructure concerns.
   - **Views Layer**: Contains view models and DTOs for read operations.
4. **CQRS Pattern**: Separates read and write operations using commands and queries.
5. **Prisma ORM**: Used for database access and schema management.
6. **Swagger**: Used for API documentation and testing.

## Code Organization

The codebase is organized as follows:

```
src/
├── accounts/               # Accounts domain module
│   ├── application/        # Application layer
│   │   ├── command-handlers/ # Command handlers
│   │   ├── commands/       # Command definitions
│   │   ├── event-handlers/ # Event handlers
│   │   ├── ports/          # Repository interfaces
│   │   ├── queries/        # Query definitions
│   │   ├── query-handlers/ # Query handlers
│   │   └── services/       # Application services
│   ├── domain/             # Domain layer
│   │   ├── events/         # Domain events
│   │   ├── types/          # Domain types
│   │   └── value-objects/  # Value objects
│   ├── infrastructure/     # Infrastructure layer
│   │   └── persistence/    # Repository implementations
│   └── views/              # Views layer
├── api-gateway/            # API Gateway module
│   ├── controllers/        # API controllers
│   └── dtos/               # Data Transfer Objects
├── favorites/              # Favorites domain module
├── notifications/          # Notifications domain module
├── prisma/                 # Prisma module
├── prompt-hub/             # Prompt Hub domain module
├── prompt-report/          # Prompt Report domain module
├── search/                 # Search domain module
├── shared/                 # Shared utilities and constants
├── voting/                 # Voting domain module
├── config/                 # Configuration module
├── app.module.ts           # Root module
└── main.ts                 # Application entry point
```

## Naming Conventions

1. **Files**:
   - Use kebab-case for file names: `user-notification.repository.ts`
   - Use suffixes to indicate file type: `.module.ts`, `.controller.ts`, `.service.ts`, `.repository.ts`, `.command.ts`, `.command-handler.ts`, `.event.ts`, `.event-handler.ts`, `.value-object.ts`

2. **Classes**:
   - Use PascalCase for class names: `UserNotificationRepository`
   - Use suffixes to indicate class type: `Module`, `Controller`, `Service`, `Repository`, `Command`, `CommandHandler`, `Event`, `EventHandler`, `ValueObject`

3. **Methods and Properties**:
   - Use camelCase for method and property names: `markAsRead()`

4. **Interfaces**:
   - Use PascalCase for interface names: `UserNotificationRepository`
   - Don't use `I` prefix for interfaces

5. **Enums**:
   - Use PascalCase for enum names: `PromptStatus`
   - Use UPPER_SNAKE_CASE for enum values: `DRAFT`, `PUBLISHED`

## Development Workflow

### Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd prompt-hub-server
   ```

2. Install dependencies
   ```bash
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env-example .env
   # Update the .env file with your configuration
   ```

4. Generate Prisma client
   ```bash
   yarn prisma:generate
   ```

5. Run database migrations
   ```bash
   yarn prisma:migrate:dev
   ```

### Development

1. Start the development server
   ```bash
   yarn start:dev
   ```

2. Access the API documentation
   ```
   http://localhost:3000/api/docs
   ```

3. Use Prisma Studio to manage the database
   ```bash
   yarn prisma:studio
   ```

### Testing

1. Run tests
   ```bash
   yarn test
   ```

2. Run tests with coverage
   ```bash
   yarn test:cov
   ```

3. Run end-to-end tests
   ```bash
   yarn test:e2e
   ```

### Building and Deployment

1. Build the application
   ```bash
   yarn build
   ```

2. Start the production server
   ```bash
   yarn start:prod
   ```

3. Deploy database migrations
   ```bash
   yarn prisma:migrate:deploy
   ```

## API Layer

The API layer is implemented using NestJS controllers and Swagger for documentation. The API Gateway module acts as an entry point for all API requests and routes them to the appropriate domain modules.

### API Documentation

The API is documented using Swagger. The documentation is available at `/api/docs` when the application is running. The Swagger setup includes:

- API endpoints with descriptions
- Request and response schemas
- Authentication requirements (JWT tokens for user and admin)

### Authentication

The application uses JWT tokens for authentication. There are two types of tokens:
- User tokens: For regular user authentication
- Admin tokens: For administrative access


## License

[MIT](LICENSE)