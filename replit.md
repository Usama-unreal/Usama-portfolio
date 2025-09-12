# Portfolio Website - 3D Visualizer & VFX Artist

## Overview

This is a visually striking, animation-rich portfolio website for a 3D Visualizer and VFX Artist. The project showcases cinematic design principles with interactive elements, particle effects, and smooth animations. Built as a modern web application, it features a comprehensive portfolio gallery, skills showcase, and professional contact system designed to highlight creative and technical expertise in the 3D visualization and VFX industry.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe component development
- **Build System**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI primitives with shadcn/ui component system for accessible, customizable components
- **Styling**: Tailwind CSS with custom design tokens supporting dark/light themes
- **State Management**: TanStack Query for server state management and data fetching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Animation System**: Custom CSS animations and transitions with scroll-triggered effects

### Design System
- **Component Library**: shadcn/ui with "new-york" style variant
- **Typography**: Inter (primary), Orbitron (display), JetBrains Mono (code)
- **Color Scheme**: Purple accent (#8B5CF6) with dark mode default and light mode toggle
- **Layout**: Responsive design with mobile-first approach using Tailwind breakpoints
- **Visual Effects**: Custom cursor, particle backgrounds, magnetic buttons, and smooth scroll animations

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Development**: Hot module replacement via Vite middleware integration
- **Static Assets**: Vite-powered asset serving with path aliases (@assets, @shared)

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: Configured for Neon Database (PostgreSQL-compatible serverless)
- **Schema**: User authentication schema with UUID primary keys
- **Migration System**: Drizzle Kit for database schema migrations
- **Development Storage**: In-memory storage implementation for rapid prototyping

### Component Architecture
- **Core Sections**: Modular components for Hero, Portfolio Gallery, Skills Showcase, About, and Contact
- **Interactive Elements**: Custom magnetic buttons, particle backgrounds, and scroll-triggered animations
- **Theme System**: Context-based theme provider with localStorage persistence
- **Navigation**: Fixed header with glassmorphism effect and smooth scroll behavior
- **Portfolio System**: Categorized gallery with hover effects and modal overlays

## External Dependencies

### UI and Animation Libraries
- **Radix UI**: Comprehensive primitive components for accessibility and customization
- **Lucide Icons**: Modern icon system for consistent visual language
- **Class Variance Authority**: Type-safe component variant management
- **Embla Carousel**: Touch-friendly carousel for portfolio showcase

### Development and Build Tools
- **TypeScript**: Static typing across client, server, and shared code
- **ESBuild**: Fast bundling for production server builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **Replit Integration**: Development environment optimizations and error overlays

### Database and Validation
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **Zod**: Runtime type validation and schema definition
- **Neon Database**: Serverless PostgreSQL for scalable data storage

### Asset Management
- **Google Fonts**: Web font loading for typography stack
- **Generated Assets**: AI-generated portfolio images and professional headshots stored in attached_assets
- **Vite Asset Processing**: Optimized asset bundling with import aliases