# Overview

CheckingIn is an AI-powered wellness coaching application built with Next.js that analyzes health data screenshots to provide personalized wellness insights and guidance. The application allows users to upload health screenshots (from fitness trackers, health apps, etc.), extracts relevant health metrics using Google's Gemini AI vision capabilities, and provides personalized coaching recommendations based on the analyzed data.

The platform features health data analysis, personalized guidance generation, wellness journaling, and progress tracking to create a comprehensive wellness coaching experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: TailwindCSS with custom design system using CSS variables for theming
- **UI Components**: Custom component library built with Radix UI primitives and class-variance-authority for consistent styling
- **State Management**: React's built-in useState and useEffect for client-side state management
- **File Handling**: Native HTML5 file input with drag-and-drop support for image uploads

## Backend Architecture  
- **API Layer**: Next.js API routes handling file uploads and health data processing
- **Image Processing**: Server-side image analysis using Google Gemini Vision API to extract health metrics from screenshots
- **Data Models**: Structured health metrics including sleep hours, recovery percentage, strain, HRV, heart rate, steps, and calories
- **File Upload**: Formidable library for handling multipart form data and image file processing

## Data Storage
- **Database**: Prisma ORM configured for database abstraction with generated client
- **Schema**: Three main models - HealthMetric (physical data), MentalHealth (wellness tracking), and Insight (AI-generated recommendations)
- **Data Persistence**: Daily health metric storage with upsert functionality to prevent duplicates

## Authentication & Security
- **Current State**: No authentication system implemented - designed as single-user prototype
- **File Security**: Server-side file validation and processing with temporary buffer storage
- **API Security**: Basic request validation and error handling

# External Dependencies

## AI Services
- **Google Gemini AI**: Vision API for analyzing health screenshots and extracting numerical metrics
- **Configuration**: Requires GEMINI_API_KEY environment variable for API access

## Database Integration
- **Prisma**: ORM for database operations with generated TypeScript client
- **Database Provider**: Configured for flexible database backend (SQLite for development, can be extended to PostgreSQL for production)

## UI & Styling
- **Radix UI**: Accessible component primitives for buttons, cards, and form inputs
- **Lucide React**: Icon library for consistent iconography throughout the application
- **Google Fonts**: Manrope font family integration for typography

## Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESLint**: Next.js core web vitals configuration for code quality
- **PostCSS**: CSS processing with TailwindCSS and Autoprefixer plugins

## Deployment Configuration
- **Replit Optimized**: Custom Next.js configuration for Replit deployment environment
- **Port Configuration**: Development and production servers configured for port 5000 with hostname binding