# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Docker-First Development

This project is designed for Docker-first development. All development should be done inside Docker containers.

### Development Commands

**Start development environment:**
```bash
# Copy environment template
cp .env.development .env

# Start development container
docker-compose up

# Or run in background
docker-compose up -d
```

**Access the development container:**
```bash
docker-compose exec app sh
```

**Stop development environment:**
```bash
docker-compose down
```

### Production Deployment

**Build and run production container:**
```bash
# Copy production environment
cp .env.production .env

# Build production image
docker build --target production -t todo-app-prod .

# Run production container
docker run -p 80:80 --env-file .env todo-app-prod
```

### Environment Configuration

Environment management is handled through `.env` files:

1. **Development**: Copy `.env.development` to `.env`
   - Contains development-specific settings
   - Gemini API key for development
   - Debug settings enabled

2. **Production**: Copy `.env.production` to `.env`
   - Contains production-specific settings
   - Production Gemini API key
   - Security settings enabled

**Required Environment Variables:**
- `GEMINI_API_KEY` - Your Gemini API key
- `NODE_ENV` - Environment (development/production)
- `VITE_APP_TITLE` - Application title
- `VITE_DEBUG` - Debug mode (true/false)

**Firebase/Firestore Configuration:**
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase Auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase Project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase Storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase Messaging Sender ID
- `VITE_FIREBASE_APP_ID` - Firebase App ID

### Firebase Setup Instructions

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable Firestore Database in the project

2. **Get Firebase Configuration**:
   - Go to Project Settings > General
   - In "Your apps" section, add a web app
   - Copy the Firebase config object values to your `.env` file

3. **Configure Firestore Security Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read/write access to todos collection
       match /todos/{document} {
         allow read, write: if true; // Modify based on your auth requirements
       }
     }
   }
   ```

4. **Update Environment Variables**:
   - Copy appropriate `.env.development` or `.env.production` to `.env`
   - Replace placeholder values with your actual Firebase config

## Architecture Overview

This is a React 19 + TypeScript + Vite todo application with the following structure:

### Core Architecture
- **Frontend**: React 19 with TypeScript, using functional components and hooks
- **Build Tool**: Vite with ES modules
- **Database**: Google Firestore (NoSQL cloud database)
- **Containerization**: Docker with multi-stage builds (development/production)
- **Web Server**: Nginx for production static file serving
- **Styling**: Tailwind CSS classes for component styling
- **State Management**: React useState hooks with Firestore real-time subscriptions

### Key Components Structure
- `App.tsx` - Main application component managing todos state and filtering logic
- `components/` - Modular React components:
  - `TodoItem.tsx` - Individual todo item with priority badges and project tags
  - `TodoList.tsx` - Container for rendering filtered todos
  - `FilterTabs.tsx` - Filter and project selection interface
  - `Header.tsx` - Application header with branding
  - `ActionButtons.tsx` - Action buttons for todo operations
  - `Summary.tsx` - Statistics summary component
  - `icons.tsx` - SVG icon components

### Data Models
- **Todo Interface**: `id`, `text`, `completed`, `priority`, `project`, `createdAt`, `dueDate`
- **Project Interface**: `id`, `name`, `color`
- **Priority Enum**: Low, Medium, High
- **Filter Enum**: All, Active, Completed

### Database & State Management
- **Firestore Database**: Cloud NoSQL database storing todos with real-time sync
- **Firebase Services**: Located in `src/firebase/`
  - `config.ts` - Firebase configuration and initialization
  - `todoService.ts` - Firestore CRUD operations and real-time subscriptions
- **State Management**: 
  - React useState hooks for local state
  - Firestore real-time subscriptions for data synchronization
  - `useMemo` for computed values (filtered todos, counts)
  - Async/await patterns for Firestore operations

### Styling Approach
- Utility-first CSS with Tailwind classes
- Gradient backgrounds and modern glass-morphism effects
- Component-scoped color mappings (priority badges, project colors)
- Responsive design with mobile-first approach

### Component Patterns
- Functional components with TypeScript interfaces
- Event handlers passed as props from parent components
- Conditional rendering for optional todo properties (project, due date)
- Icon components for consistent UI elements

The application uses modern React patterns with hooks, TypeScript for type safety, and a component-based architecture that separates concerns between data management, presentation, and user interactions.