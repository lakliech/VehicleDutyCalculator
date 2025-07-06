# Vehicle Duty Calculator

## Overview

This is a full-stack web application that calculates vehicle duty fees based on various vehicle parameters. The application features a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Validation**: Zod schemas shared between frontend and backend
- **API**: RESTful endpoints for duty calculation and rate retrieval

### Project Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared schemas and types between frontend and backend
- `migrations/` - Database migration files

## Key Components

### Database Schema
- **duty_rates**: Stores duty calculation rates by vehicle type
- **vehicles**: Stores vehicle information (currently defined but not actively used)

### API Endpoints
- `GET /api/duty-rates` - Retrieve all duty rates
- `GET /api/duty-rates/:vehicleType` - Get specific duty rate by vehicle type
- `POST /api/calculate-duty` - Calculate duty fees for a vehicle

### Frontend Components
- **DutyCalculator**: Main page with form for duty calculation
- **UI Components**: Comprehensive set of shadcn/ui components for consistent design
- **Form Validation**: Zod schemas ensure data integrity

## Data Flow

1. User fills out vehicle information form
2. Form data is validated using Zod schemas
3. Data is sent to backend API for duty calculation
4. Backend retrieves appropriate duty rates from database
5. Calculation is performed based on vehicle parameters
6. Results are returned and displayed to user

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Router)
- UI library (Radix UI components via shadcn/ui)
- Form handling (React Hook Form, Hookform Resolvers)
- HTTP client (built-in fetch with React Query)
- Styling (Tailwind CSS, class-variance-authority)

### Backend Dependencies
- Express.js server framework
- Drizzle ORM for database operations
- Neon Database serverless driver
- Zod for schema validation
- PostgreSQL session storage (connect-pg-simple)

### Development Dependencies
- Vite for build tooling
- TypeScript for type safety
- ESBuild for server bundling
- Tailwind CSS for styling
- PostCSS for CSS processing

## Deployment Strategy

### Build Process
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle migrations handle schema changes

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment setting (development/production)

### Startup
- Development: `npm run dev` - starts server with hot reload
- Production: `npm run build && npm start` - builds and starts production server

## Changelog

Changelog:
- July 06, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.