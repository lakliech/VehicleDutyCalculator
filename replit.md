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
4. **Railway Development Levy (RDL)**: 2% for direct imports only
5. **Import Declaration Fee (IDF)**: 2.5% for direct imports only

## Depreciation Rates
The system implements updated depreciation rates:
- **Direct Imports**: 
  - 0-6 months: 5%
  - Over 6 months to 1 year: 10%
  - >1 ≤2 years: 25%
  - >2 ≤3 years: 35%
  - >3 ≤4 years: 45%
  - >4 ≤5 years: 55%
  - >5 ≤6 years: 60%
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
- January 10, 2025. Added CRSP2020 comprehensive vehicle coverage:
  - Added 634 new vehicles from CRSP2020 CSV to database (total now 3,504 vehicles)
  - Implemented fallback system: Current CRSP_KES takes priority, falls back to CRSP2020
  - Added visual indicators (orange badges) when 2020 CRSP values are used
  - Warning messages inform users that 2020 prices may differ from current market
  - Enhanced calculation results and toast notifications to indicate CRSP source
  - Created add-missing-vehicles.ts script for future vehicle database expansions
- January 10, 2025. Enhanced admin dashboard with comprehensive management features:
  - Added additional columns to vehicle table (GVW, CRSP 2020 with visual indicators)
  - Implemented vehicle editing functionality with comprehensive form including all fields
  - Added vehicle deletion capability with confirmation prompts and proper cleanup
  - Created tax rate addition functionality allowing admins to add new vehicle categories
  - Enhanced backend with PUT/DELETE endpoints for vehicle management and POST for tax rates
  - Updated validation schemas to include crsp2020 and discontinuationYear fields
  - Improved UX with edit/delete buttons, dialogs, and proper error handling
- January 10, 2025. Implemented CRSP proration for vehicles not in database:
  - Added manual entry mode in vehicle selector with toggle between database and manual entry
  - Users can input make, model, and engine capacity for vehicles not in database
  - System searches for reference vehicles from same make with CRSP values and engine capacity
  - Prorates CRSP value using formula: reference_crsp × manual_engine_capacity ÷ reference_engine_capacity
  - Example: Peugeot 2008 (1200cc) uses Peugeot 3008 (1598cc) reference: 5,499,000 × 1200 ÷ 1598
  - Enhanced UI with proration calculation display and clear data source indicators
  - Updated backend search endpoint to filter reference vehicles with valid CRSP and engine data
  - Integrated manual vehicle data into duty calculation workflow with appropriate notifications
- January 10, 2025. Complete branding transformation to Gariyangu:
  - Updated from Nexa to Gariyangu branding with new logo integration
  - Implemented Satoshi font throughout the application for modern typography
  - Transformed color scheme from green theme to purple/cyan palette:
    - Primary: Purple (hsl(267, 83%, 57%))
    - Secondary: Cyan (hsl(196, 100%, 85%))
    - Gradients: Purple header gradients and purple-to-cyan contact section
  - Updated all UI components including headers, buttons, badges, and backgrounds
  - Enhanced visual hierarchy with gradient backgrounds (purple-to-cyan on pages)
  - Updated tagline from "discover what is possible" to "All About Cars"
- January 10, 2025. Added professional car import contact integration:
  - Implemented WhatsApp contact section below header with car import services promotion
  - Direct WhatsApp link with pre-filled message for car import inquiries
  - Contact information: 0736 272719 for Japan/UK/South Africa/Dubai/Australia/Singapore/Thailand imports
  - Professional styling with gradient background and responsive design
  - Clear call-to-action for users interested in car import services
- January 10, 2025. Fixed category validation system:
  - Completely resolved issue where multiple conflicting categories could be selected
  - Enhanced validation with comprehensive conflict detection for Electric vs petrol/diesel
  - Added specialized category validation for Prime Mover, Trailer, School Bus, etc.
  - Submit button now disables when conflicts exist with clear error messages
  - Updated Gariyangu purple/cyan branding throughout category selector
- January 10, 2025. Updated depreciation rates and age calculation:
  - Modified depreciation rates to match user specifications: 2018 (65%), 2019 (60%), 2020 (55%)
  - Updated age calculation to always add 1 year: age = current_year - manufacture_year + 1
  - Adjusted intermediate depreciation rates for consistent progression
  - Updated documentation to reflect new depreciation schedule
- January 10, 2025. Updated Railway Development Levy (RDL) to 2%:
  - Changed RDL rate from 1.5% to 2% across all system components
  - Updated backend storage calculations and breakdown descriptions
  - Modified PDF generator to display 2% RDL rate
  - Updated database processing fees and computation tables
  - Updated all documentation to reflect new 2% RDL rate
- January 10, 2025. Updated brand identity and logo:
  - Changed logo from gariyangu_1751901637375.png to gylogo_1752064168868.png
  - Updated logo sizing to meet minimum requirement of 250x150px
  - Applied new color scheme (#ffffff, #381072, #740a72, #b10573, #ee0074) throughout application
  - Updated header heights and spacing to accommodate larger logo
  - Modernized color scheme in both light and dark modes
  - Updated PDF generator to use new logo and color scheme with full brand colors
  - Applied consistent branding across admin dashboard and main calculator
  - Enhanced PDF styling with gradient effects and modern color palette
- January 10, 2025. Implemented comprehensive Vehicle Transfer Cost Calculator:
  - Created complete database schema for vehicle transfer rates with engine capacity ranges
  - Imported official transfer rates for vehicles (1000cc & below: 2,210/= to 3001cc+: 6,465/=), trailers, and tractors
  - Built comprehensive transfer cost calculation API endpoint with government fees, legal fees, and additional costs
  - Developed fully functional transfer cost calculator page with vehicle selection interface
  - Integrated vehicle, trailer, and heavy machinery selectors for accurate rate determination
  - Added detailed cost breakdown display with categorized fee structures and grand total calculations
  - Implemented transfer process timeline and required documents guide for user education
  - Included comprehensive notes and disclaimers for accurate user expectations
  - Applied consistent Gariyangu branding with purple-cyan color scheme throughout transfer module
- January 10, 2025. Enhanced Vehicle Transfer Cost Calculator:
  - Fixed broken filters in vehicle selector by restructuring query keys and adding proper category filtering
  - Renamed "Manual Entry with Proration" to "Enter Vehicle manually" as requested
  - Removed vehicle value option from transfer cost calculator form
  - Removed fee tiles at bottom of transfer cost page for cleaner UI
  - Improved query structure in VehicleSelector with proper queryFn functions and category support
  - Enhanced cache management with more specific query keys to avoid conflicts
- January 10, 2025. Streamlined VehicleSelector and Sell My Car page:
  - Completely removed manual vehicle entry functionality from VehicleSelector component for simplified database-only selection
  - Removed "Select Your Vehicle" title from Sell My Car page for cleaner UI
  - Moved listing title field to top of form, now appears before vehicle selection
  - Removed vehicle selection confirmation card and additional vehicle info display (seating, GVW)
  - Simplified VehicleSelector interface to only support database vehicle selection with automatic engine size handling
  - Enhanced form flow with listing title positioned prominently at the start
- January 10, 2025. Fixed transfer cost calculator issues:
  - Resolved API call parameter order error in frontend (apiRequest expects method, url, data)
  - Populated empty vehicle database with 2,836 vehicle records from import scripts
  - Imported 11 transfer rates for proper cost calculations
  - Populated all computation tables (depreciation rates, tax rates, vehicle category rules)
  - Vehicle make and model selection now returns proper results for all vehicle types
- January 10, 2025. Added specialized equipment databases:
  - Created trailers table with 28 records from trailers CSV data
  - Created heavy_machinery table with 112 records from tractors/equipment CSV data
  - Imported comprehensive equipment data including CRSP values, specifications, and categories
  - Added automated import scripts for both databases with data cleaning and categorization
  - Extended database schema to support trailers and heavy machinery duty calculations
- January 10, 2025. Fixed category validation and Heavy Machinery logic:
  - Removed duplicate category selection section from frontend for cleaner UX
  - Updated validation logic to work with category-first selection flow
  - Fixed Heavy Machinery validation that was incorrectly checking for regular vehicles
  - Category validation now properly handles all three equipment types: vehicles, trailers, heavy machinery
  - Year of manufacture validation now skips trailers and heavy machinery (not required)
  - Submit button correctly disables when category conflicts exist across all equipment types
- January 10, 2025. Fixed RDL and IDF calculations:
  - Corrected Railway Development Levy (RDL) to use 2% of customs value instead of VAT value
  - Corrected Import Declaration Fee (IDF) to use 2.5% of customs value instead of VAT value
  - Updated breakdown descriptions to clearly show percentages and calculation base
  - Ensured compliance with proper duty calculation standards
- January 10, 2025. Fixed CRSP proration submit button issue:
  - Resolved bug where calculate duty button was disabled after proration
  - Category validation was incorrectly using reference vehicle's engine capacity instead of manual vehicle's capacity
  - Updated validation logic to use manual vehicle's engine capacity when in proration mode
  - Proration functionality now works correctly from manual entry to duty calculation
- January 10, 2025. Repositioned app as automotive tools aggregator:
  - Added top navigation menu bar with multiple automotive tools
  - Created placeholder pages for Vehicle Importation Estimator, Vehicle Service Estimator, and Vehicle Transfer Cost
  - Restructured app architecture with Navigation component and updated routing
  - Motor Vehicle Duty Calculator is now one tool among four in the aggregator
  - Updated branding to position as comprehensive automotive tools platform
  - Enhanced user experience with modern navigation and tool categorization
- January 10, 2025. Transformed into Kenya's Car Marketplace:
  - Changed branding from "Automotive Tools" to "Kenya's Car Marketplace"
  - Increased logo size for better visibility and brand presence
  - Separated MyCar's Worth and Transfer Cost into distinct tools
  - Added "Sell My Car" marketplace functionality page
  - Created comprehensive home page with hero section, featured tools, and company contact
  - Moved duty calculator from root (/) to inner page (/duty-calculator)
  - Expanded navigation to 7 tools: Duty Calculator, Import Calculator, Service Estimates, MyCar's Worth, Transfer Cost, Sell My Car, Vehicle Loan Products
  - Enhanced home page with marketplace positioning, WhatsApp contact integration, and professional landing experience
- January 10, 2025. Frontend reorganization and admin link relocation:
  - Simplified home page to display only basic information and clean menu tiles for all 8 automotive tools
  - Moved admin link from duty calculator module to static header section for global access across all pages
  - Reorganized home page layout with single grid of tool tiles instead of separate featured/all tools sections
  - Enhanced navigation header with admin button positioned permanently in top-right corner
  - Admin link now accessible on all module pages ensuring consistent administrative access throughout platform
- January 10, 2025. Completed ModuleNavigation component implementation:
  - Created comprehensive ModuleNavigation component with cross-module navigation and authentication links
  - Added ModuleNavigation to all 8 module pages: duty-calculator, transfer-cost, importation-estimator, service-estimator, mycars-worth, sell-my-car, buy-a-car, vehicle-loans
  - Implemented clean, compact design with purple-themed styling consistent with Gariyangu branding
  - Each module page now includes small navigation menu linking to other modules with Login/Register functionality
  - Achieved complete separation between static header navigation and module-specific cross-navigation
  - Resolved all JSX syntax errors and confirmed application runs successfully with new navigation structure

## User Preferences

Preferred communication style: Simple, everyday language.