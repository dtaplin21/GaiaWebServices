# Overview

This is a full-stack web application for a professional portfolio website with payment processing capabilities. The application serves as a showcase for web design and development services, featuring a portfolio section, about information, and an integrated payment system for project requests. It's built with a modern tech stack using React for the frontend, Express.js for the backend, and includes comprehensive UI components, payment processing through Stripe, and file storage capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Comprehensive component library using Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom design system and CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod schema validation for type-safe form handling

## Backend Architecture
- **Server**: Express.js with TypeScript in ESM format
- **API Design**: RESTful API endpoints for portfolio management, user data, and payment processing
- **Database Layer**: Drizzle ORM with PostgreSQL support, using Neon Database for serverless deployment
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Development**: Hot-reload development server with Vite middleware integration

## Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Centralized schema definitions with automatic type generation
- **File Storage**: Google Cloud Storage integration with custom ACL (Access Control List) system for secure file management
- **In-Memory Storage**: Fallback memory storage implementation for development and testing

## Authentication and Authorization
- **File Access Control**: Custom object-level ACL system for fine-grained file permissions
- **API Security**: Request/response logging middleware for monitoring and debugging
- **Environment-based Configuration**: Secure credential management using environment variables

## External Dependencies

### Payment Processing
- **Stripe**: Complete payment infrastructure with React integration
- **Features**: Payment intent creation, checkout flows, and webhook handling
- **Security**: Server-side payment processing with client-side confirmation

### Communication Services  
- **SendGrid**: Email service integration for transactional emails and notifications
- **Configuration**: API key-based authentication with error handling

### Cloud Services
- **Google Cloud Storage**: Object storage with custom authentication via Replit sidecar
- **Replit Integration**: Specialized plugins for development environment optimization
- **Deployment**: Configured for Replit hosting with production build optimization

### UI and Development Tools
- **Component Libraries**: Extensive Radix UI component collection for accessibility
- **Development Plugins**: Vite plugins for error overlay, cartographer, and dev banner
- **Font Integration**: Google Fonts with custom font configurations
- **Build Tools**: ESBuild for server bundling, PostCSS for CSS processing

### Database and ORM
- **Neon Database**: Serverless PostgreSQL with connection pooling
- **Drizzle Kit**: Database migration and schema management tools
- **Type Safety**: Full TypeScript integration with automatic type inference