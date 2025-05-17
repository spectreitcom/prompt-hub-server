# Prompt Hub Server Guidelines

## Project Overview

Prompt Hub Server is a NestJS-based backend application for managing and sharing prompts. The application allows users to create, publish, and manage prompts, organize them into catalogs, vote on prompts, report inappropriate content, and search for prompts.

## Architecture Description

The application follows a clean architecture pattern with Domain-Driven Design (DDD) principles and Command Query Responsibility Segregation (CQRS) pattern.

### Key Architectural Components:

1. **API Gateway**: Acts as an entry point for all API requests and routes them to the appropriate domain modules.
2. **Domain Modules**: Separate modules for different domains (accounts, prompt-hub, notifications, voting, etc.).
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
├── api-gateway/            # API Gateway module
├── favorites/              # Favorites domain module
├── notifications/          # Notifications domain module
│   ├── application/        # Application layer
│   │   ├── command-handlers/ # Command handlers
│   │   ├── commands/       # Command definitions
│   │   ├── event-handlers/ # Event handlers
│   │   └── ports/          # Repository interfaces
│   ├── domain/             # Domain layer
│   │   └── value-objects/  # Value objects
│   ├── infrastructure/     # Infrastructure layer
│   │   └── persistence/    # Repository implementations
│   └── views/              # Views layer
├── prisma/                 # Prisma module
├── prompt-hub/             # Prompt Hub domain module
├── prompt-report/          # Prompt Report domain module
├── search/                 # Search domain module
├── shared/                 # Shared utilities and constants
├── voting/                 # Voting domain module
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

1. **Setup**:
   - Clone the repository
   - Install dependencies: `yarn install`
   - Set up environment variables: Copy `.env-example` to `.env` and update values
   - Generate Prisma client: `yarn prisma:generate`
   - Run database migrations: `yarn prisma:migrate:dev`

2. **Development**:
   - Start the development server: `yarn start:dev`
   - Access the API documentation: `http://localhost:3000/api/docs`
   - Use Prisma Studio to manage the database: `yarn prisma:studio`

3. **Testing**:
   - Run tests: `yarn test`
   - Run tests with coverage: `yarn test:cov`
   - Run end-to-end tests: `yarn test:e2e`

4. **Building and Deployment**:
   - Build the application: `yarn build`
   - Start the production server: `yarn start:prod`
   - Deploy database migrations: `yarn prisma:migrate:deploy`

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

## Best Practices

1. **Domain-Driven Design**:
   - Keep domain logic in the domain layer
   - Use value objects for domain concepts
   - Use domain events for cross-domain communication

2. **CQRS Pattern**:
   - Use commands for write operations
   - Use queries for read operations
   - Keep command handlers focused on a single responsibility

3. **Clean Architecture**:
   - Keep dependencies pointing inward (domain layer should not depend on application or infrastructure layers)
   - Use interfaces (ports) in the application layer and implement them in the infrastructure layer
   - Keep infrastructure concerns out of the domain and application layers

4. **Error Handling**:
   - Use domain-specific exceptions
   - Handle exceptions at the appropriate level
   - Return meaningful error messages to clients

5. **Testing**:
   - Write unit tests for domain logic
   - Write integration tests for repositories
   - Write end-to-end tests for API endpoints

6. **Security**:
   - Validate all input data
   - Use proper authentication and authorization
   - Protect against common security vulnerabilities (XSS, CSRF, etc.)

7. **Performance**:
   - Use database indexes for frequently queried fields
   - Use pagination for large result sets
   - Use caching where appropriate

8. **API Design**:
   - Use RESTful principles for API design
   - Use DTOs for request and response data
   - Document all API endpoints with Swagger
   - Use proper HTTP status codes and error responses