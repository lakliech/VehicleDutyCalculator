# Kenya Motor Vehicle Duty Calculator

## Overview

This is a full-stack web application that calculates Kenya Revenue Authority (KRA) import duties and taxes for motor vehicles. The application implements the official KRA valuation formula for various vehicle categories, including depreciation rates for both direct imports and previously registered vehicles. The application features a modern React frontend with shadcn/ui components and an Express.js backend.

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
- **API**: RESTful endpoints for duty calculation and history retrieval
- **Storage**: DatabaseStorage class handles all database operations

### Project Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared schemas and types between frontend and backend
- `migrations/` - Database migration files

## Key Components

### Database Schema
- **vehicles**: Stores vehicle information with Kenya-specific fields including category, value, age, import type
- **calculations**: Stores calculation results linked to vehicles with all tax components
- **duty_rates**: Legacy table (not used in current Kenya implementation)

### API Endpoints
- `POST /api/calculate-duty` - Calculate import duties and taxes for a vehicle using KRA formulas
- `GET /api/calculations/history` - Retrieve calculation history with vehicle details

### Frontend Components
- **DutyCalculator**: Main page with comprehensive form for Kenya vehicle duty calculation
- **UI Components**: Comprehensive set of shadcn/ui components with Kenya-themed green color scheme
- **Form Validation**: Zod schemas ensure data integrity for Kenya-specific requirements

## Vehicle Categories
The calculator supports all major Kenya vehicle import categories:
- **Under 1500cc**: Standard vehicles with engine capacity below 1500cc
- **Over 1500cc**: Vehicles with engine capacity 1500cc and above
- **Large Engine**: Petrol >3000cc or Diesel >2500cc (higher tax rates)
- **Electric**: Fully electric vehicles (reduced import duty and excise duty)
- **School Bus**: Designated student transport vehicles
- **Prime Mover**: Heavy duty truck heads
- **Trailer**: Transport trailers
- **Ambulance**: Emergency medical vehicles (no import duty)
- **Motorcycle**: Two-wheeled vehicles (fixed excise duty)
- **Special Purpose**: Specialized vehicles
- **Heavy Machinery**: Construction and industrial equipment

## Tax Components
The calculator computes the following Kenya-specific taxes:
1. **Import Duty**: Varies by vehicle type (0-35%)
2. **Excise Duty**: Based on vehicle category (0-35%)
3. **VAT**: 16% on the cumulative value
4. **Railway Development Levy (RDL)**: For direct imports only
5. **Import Declaration Fee (IDF)**: For direct imports only

## Depreciation Rates
The system implements official KRA depreciation rates:
- **Direct Imports**: 
  - 0-6 months: 5%
  - Over 6 months: 10%
  - >1 ≤2 years: 15%
  - >2 ≤3 years: 20%
  - >3 ≤4 years: 30%
  - >4 ≤5 years: 40%
  - >5 ≤6 years: 50%
  - >6 ≤7 years: 60%
  - >7 ≤8 years: 65%
- **Previously Registered**: Higher depreciation from 20% (1 year) to 95% (over 15 years)

## Data Flow

1. User selects vehicle category and enters details (value, age, import type)
2. Form data is validated using Kenya-specific Zod schemas
3. Data is sent to backend API for duty calculation
4. Backend applies depreciation based on vehicle age and import type
5. Calculation is performed using KRA formulas for the specific vehicle category
6. Results include customs value, all applicable taxes, and total payable amount
7. Detailed breakdown is displayed showing each tax component

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
- January 09, 2025. Converted to Kenya Motor Vehicle Duty Calculator using official KRA valuation formulas and tax rates
- January 10, 2025. Updated vehicle selection flow:
  - Removed manual vehicle category selection
  - Made engine size required for all calculations
  - Vehicle category now auto-detects based on engine size
  - Fixed vehicle model dropdown issues
  - Modified workflow to fetch engine sizes from database
  - Replaced vehicle age field with year of manufacture selector
  - Workflow: Select make → Select model → Select engine size (from database) → Select year of manufacture → Auto-calculate duty with CRSP
  - Removed toggle option - database is now the only entry point for vehicle selection
  - CRSP field is always disabled and automatically populated from database

## User Preferences

Preferred communication style: Simple, everyday language.