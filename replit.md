# Kenya Motor Vehicle Duty Calculator

## Overview

This is a full-stack web application designed to calculate Kenya Revenue Authority (KRA) import duties and taxes for motor vehicles. It implements official KRA valuation formulas, including depreciation rates, for various vehicle categories and import types. The application also serves as Kenya's Car Marketplace, offering tools for selling, buying, vehicle recommendations, and financial services. Its vision is to be a comprehensive automotive tools platform and marketplace, targeting significant market potential in Kenya.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Application
- **Frontend**: React 18 with TypeScript, styled using Tailwind CSS and shadcn/ui (Kenya-themed green color scheme transitioned to Gariyangu purple/cyan). State managed with React Query, forms with React Hook Form and Zod validation, and client-side routing with Wouter. Built with Vite.
- **Backend**: Express.js with TypeScript, using PostgreSQL as the database with Drizzle ORM (via Neon Database). Zod schemas are shared for validation.
- **Key Features**:
    - **Duty Calculation**: Implements KRA formulas for various vehicle categories (e.g., under 1500cc, electric, heavy machinery), applying depreciation and tax components (Import Duty, Excise Duty, VAT, RDL, IDF). Supports CRSP proration for vehicles not in the database.
    - **Location System**: Auto-populates Kenya locations (counties and areas) from CSV data, used in a cascading selector.
    - **Vehicle Data**: Comprehensive database (`vehicles`, `vehicle_references`) including CRSP values, make, model, and engine capacity. Rules for automatic vehicle category detection.
    - **UI/UX**: Modern shadcn/ui components, professional branding with Gariyangu (purple/cyan) color scheme and Satoshi font. Floating action buttons for quick access to concierge and social commerce features.
    - **Authentication**: Google OAuth with role-based access control (RBAC) supporting a 17-role hierarchy (Super Admin to User).
    - **Payment System**: Integrated with Paystack for card and mobile money payments, supporting prepayment, pay-on-delivery, and a credit system.
    - **AI Integration**: AI-powered natural language search (OpenAI GPT-4o) for vehicle filtering and an AI Advisor chatbot for recommendations.
    - **SMS Notifications**: Multi-provider SMS engine for transactional and marketing messages, with template management and logging.
    - **Admin Dashboard**: Reorganized with a streamlined 4-tab structure (Core Management, Marketplace, Monetization, System Config) and context-sensitive sub-navigation for improved usability and granular control.
    - **Analytics**: Comprehensive seller analytics (views, inquiries, market benchmarks, quality scores) and keyword analytics for search terms, with real-time tracking.
    - **Loan Application System**: Integration for viewing loan applications by sellers.
    - **Image Management**: Sharp image optimization service for WebP conversion and automatic compression, with Redis caching.
    - **Monetization**: Full subscription management (Basic, Professional, Enterprise tiers) with feature enforcement, product catalog, and revenue strategy management.

### Data Flow
User inputs vehicle details → Frontend validation → Data sent to backend API → Backend applies depreciation and KRA formulas → Results returned including customs value, taxes, and total payable amount.

## External Dependencies

- **Database**: PostgreSQL (via Neon Database)
- **ORM**: Drizzle ORM
- **UI Libraries**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form, Zod
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: Wouter
- **Build Tool**: Vite
- **AI/NLP**: OpenAI GPT-4o
- **Payment Gateway**: Paystack
- **SMS Providers**: Africa's Talking, Twilio, InfoBip, Clickatell
- **Mapping**: Google Maps API
- **Authentication**: Passport.js (for Google OAuth)
- **Image Processing**: Sharp
- **Caching**: Redis
- **Charting**: Recharts
- **External Services**:
    - http://www.qisj.co.uk/processVerifyCertificate.php (for mileage verification)