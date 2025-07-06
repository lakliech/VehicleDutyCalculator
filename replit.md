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
- **depreciation_rates**: Stores depreciation rates for different import types and age ranges
- **tax_rates**: Stores tax rates (import duty, excise duty, VAT, RDL, IDF) for each vehicle category
- **vehicle_category_rules**: Stores rules for automatic vehicle category detection based on engine size and fuel type
- **vehicle_references**: Stores the comprehensive vehicle database with make, model, engine capacity, and CRSP values

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
The calculator computes the following Kenya-specific taxes (Updated per KRA official rates):
1. **Import Duty**: 
   - Under 1500cc: 35%
   - 1500cc-3000cc (petrol) / 1500cc-2500cc (diesel): 35%
   - Over 3000cc (petrol) / Over 2500cc (diesel): 35%
   - Electric: 25%
   - School Bus: 35%
   - Prime Mover: 25%
   - Trailer: 35%
   - Ambulance: 0%
2. **Excise Duty**: 
   - Under 1500cc: 20%
   - 1500cc-3000cc (petrol) / 1500cc-2500cc (diesel): 20%
   - Over 3000cc (petrol) / Over 2500cc (diesel): 35%
   - Electric: 10%
   - School Bus: 25%
   - Prime Mover: 0%
   - Trailer: 0%
   - Ambulance: 25%
3. **VAT**: 16% on the cumulative value
4. **Railway Development Levy (RDL)**: 1.5% for direct imports only
5. **Import Declaration Fee (IDF)**: 2.5% for direct imports only

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
- January 10, 2025. Stored computation logic in database:
  - Created depreciation_rates table to store age-based depreciation rates
  - Created tax_rates table to store category-specific tax percentages
  - Created vehicle_category_rules table for automatic category detection
  - Updated DatabaseStorage to fetch rates from database instead of hardcoded values
  - Allows dynamic configuration of tax rates without code changes
- January 10, 2025. Added Nexa logo to frontend:
  - Integrated Nexa company logo in the header
  - Responsive design: Full logo with title on desktop, compact view on mobile
  - Professional branding with "discover what is possible" tagline
- January 10, 2025. Fuel type from database:
  - Removed manual fuel type selection field
  - Fuel type now automatically fetched from vehicle database
  - Normalized all fuel types to lowercase in database
  - Vehicle category detection uses fuel type from selected vehicle
- January 10, 2025. UI improvements:
  - Grouped all selection dropdowns (vehicle, year, import type) in one area
  - Removed CRSP input textbox - values only from database
  - CRSP displays within selection area when vehicle is selected
  - Enhanced visual grouping with gray background container
- January 10, 2025. Form validation and workflow updates:
  - Added mandatory validation for all fields before calculation
  - Import Type selection moved to Step 1 
  - Year of Manufacture limited to 8 years for Direct Import, 20 years for Previously Registered
  - Clear visual indicators with red asterisks (*) for required fields
  - Error messages displayed when attempting to calculate without selecting all fields
- January 10, 2025. Fixed depreciation rate calculation logic:
  - Corrected SQL comparison from string to numeric for age calculations
  - Fixed depreciation rate ranges per KRA requirements:
    - >6 but <7 years: 60% depreciation
    - >=7 but <=8 years: 65% depreciation
  - Ensures vehicles aged exactly 7 years get 65% depreciation
  - Numeric comparisons prevent string sorting issues (e.g., "10" < "2")
- January 10, 2025. Updated tax rates per official KRA template:
  - Import Duty: All standard vehicles now 35% (except Electric 25%, Prime Mover 25%, Ambulance 0%)
  - Excise Duty: Under 3000cc petrol/2500cc diesel now 20%, over these limits 35%
  - Electric vehicles: 25% import duty, 10% excise duty
  - Prime Movers and Trailers: 0% excise duty
  - All rates updated to match KRA Motor Vehicle Valuation Template effective July 2023
- January 10, 2025. Added emoji-based vehicle category selector:
  - Created VehicleCategorySelector component with visual emoji icons for each category
  - Added toggle to switch between auto-detection and manual category selection
  - Each category card shows emoji, description, and applicable tax rates
  - Manual selection overrides auto-detection based on engine size
  - Enhanced user experience with visual category identification
- January 10, 2025. Implemented category conflict validation:
  - Added validation to prevent manual category selection from conflicting with vehicle specs
  - Real-time conflict warnings for engine size mismatches (e.g., selecting "Under 1500cc" for 2000cc vehicle)
  - Fuel type validation (e.g., prevents selecting "Electric" for petrol vehicles)
  - Body type checks for specialized categories (motorcycle, bus, ambulance)
  - Form submission blocked when conflicts exist with clear error messages
  - Conflicts automatically clear when switching back to auto-detection mode

## User Preferences

Preferred communication style: Simple, everyday language.