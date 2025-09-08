# MoodTracker - Complete Build Instructions

## Overview
MoodTracker is a personal wellness journaling application built with Next.js, Prisma, and SQLite. It allows users to track daily mood, sleep, stress levels, and other wellness metrics with beautiful visualizations and insights.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Quick Start

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Setup Environment Variables
Create a `.env` file in the root directory:
\`\`\`env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DATABASE_URL="file:./dev.db"
\`\`\`

### 3. Setup Database
\`\`\`bash
# Generate Prisma client
npx prisma generate

# Create and migrate database
npx prisma db push

# Optional: View database in Prisma Studio
npx prisma studio
\`\`\`

### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### 5. Access the Application
Open [http://localhost:3000](http://localhost:3000) in your browser

## Features Implemented ✅

### Authentication & Security
- ✅ Secure user registration and login
- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected routes with middleware
- ✅ Automatic token refresh

### Mood Entry System
- ✅ Comprehensive entry form with sliders
- ✅ Track sleep hours (0-12h with 0.5h increments)
- ✅ Rate stress, symptoms, mood, engagement (1-10 scale)
- ✅ Optional medications and notes fields
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Date selection and validation

### Dashboard Interface
- ✅ Welcoming user dashboard
- ✅ Statistics overview with trends
- ✅ Recent entries display
- ✅ Quick entry creation
- ✅ Responsive navigation
- ✅ User profile management

### Reports & Analytics
- ✅ Mood trend visualization over time
- ✅ Sleep vs mood correlation analysis
- ✅ Weekly averages bar charts
- ✅ Overall wellness score calculation
- ✅ Trend indicators and insights
- ✅ Interactive charts with Recharts

### UI/UX Design
- ✅ Calming wellness-themed color palette
- ✅ Responsive design (mobile-first)
- ✅ Loading states and error handling
- ✅ Smooth animations and transitions
- ✅ Accessible form controls
- ✅ Professional typography

## Database Schema

### User Model
- `id`: Unique identifier
- `email`: User email (unique)
- `password`: Hashed password
- `createdAt`: Account creation timestamp

### Entry Model
- `id`: Unique identifier
- `date`: Entry date
- `sleep`: Sleep hours (decimal)
- `stress`: Stress level (1-10)
- `symptoms`: Symptom severity (1-10)
- `mood`: Mood rating (1-10)
- `engagement`: Engagement level (1-10)
- `drugs`: Optional medications/supplements
- `notes`: Optional personal notes
- `userId`: Foreign key to User
- `createdAt`: Entry creation timestamp
- `updatedAt`: Last update timestamp

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Entries
- `GET /api/entries` - List user entries
- `POST /api/entries` - Create new entry
- `GET /api/entries/[id]` - Get specific entry
- `PUT /api/entries/[id]` - Update entry
- `DELETE /api/entries/[id]` - Delete entry

## Project Structure
\`\`\`
mood-tracker/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── entries/           # Entry management pages
│   ├── reports/           # Analytics and reports
│   ├── login/             # Authentication pages
│   └── signup/
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── entries/          # Entry management components
│   ├── layout/           # Layout components
│   ├── reports/          # Chart and analytics components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database connection
│   └── utils.ts          # General utilities
├── prisma/               # Database schema and migrations
└── scripts/              # Database initialization scripts
\`\`\`

## Development Commands

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Database commands
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema changes
npx prisma studio        # Open database GUI
npx prisma db seed       # Run seed scripts (if configured)
\`\`\`

## Production Deployment

### Environment Variables for Production
\`\`\`env
JWT_SECRET=your-production-jwt-secret-very-long-and-secure
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourdomain.com"
\`\`\`

### Deployment Steps
1. Set up production database (PostgreSQL recommended)
2. Update `DATABASE_URL` in environment variables
3. Update Prisma schema provider if needed
4. Run `npx prisma generate && npx prisma db push`
5. Deploy to your preferred platform (Vercel, Railway, etc.)

## Security Considerations
- JWT secrets should be long and random in production
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Regular security updates for dependencies
- Consider implementing session management for enhanced security

## Troubleshooting

### Common Issues
1. **Database connection errors**: Ensure DATABASE_URL is correct
2. **JWT token issues**: Verify JWT_SECRET is set
3. **Build errors**: Run `npm install` and `npx prisma generate`
4. **Port conflicts**: Change port with `npm run dev -- -p 3001`

### Reset Database
\`\`\`bash
rm prisma/dev.db
npx prisma db push
\`\`\`

## License
This project is for personal use and learning purposes.

---

**Note**: This is a localhost-only application designed for personal wellness tracking. All data is stored locally in your SQLite database.
