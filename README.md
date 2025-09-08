<div align="center">
  <br />
    <a>
      <img src="https://github.com/user-attachments/assets/fb1991c8-22b9-4764-aa10-707a89532e89" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" alt="prisma" />
  </div>

  <h3 align="center">MoodTracker — A Personal Wellness Management System</h3>

   <div align="center">
     <em>Track your mood, understand your patterns, improve your wellbeing!</em>
    </div>
</div>

## <a name="introduction">🤖 Introduction</a>

MoodTracker is a comprehensive and modern personal wellness management system designed to help individuals track their daily moods, sleep patterns, stress levels, and overall mental health. Built using cutting-edge technologies like Next.js, Prisma, and TailwindCSS, MoodTracker delivers a fast, secure, and intuitive user experience.

This platform empowers users to seamlessly register, log daily mood entries, visualize their wellness patterns through beautiful charts, and gain insights into their mental health journey — all while maintaining complete privacy and security. The application features a clean dashboard where users can monitor their progress, view detailed analytics, and build better wellness habits.

**Demo:** https://your-mood-tracker.vercel.app/

## ⚙️ Tech Stack
- **Frontend Framework**: Next.js 15 with TypeScript
- **Database**: Prisma ORM with SQLite
- **Styling**: TailwindCSS + ShadCN UI Components
- **Authentication**: JWT with secure cookie storage
- **Charts & Analytics**: Recharts for data visualization
- **State Management**: React hooks and context
- **Icons**: Lucide React
- **Type Safety**: TypeScript with Zod validation
- **Notifications**: Sonner for toast notifications

## Project Structure
```
MoodTracker/
├── app/                    # Next.js app directory (pages and routing)
│   ├── api/               # API routes for backend functionality
│   ├── dashboard/         # Dashboard page
│   ├── entries/           # Entry management pages
│   ├── reports/           # Analytics and reports
│   ├── login/             # Authentication pages
│   └── signup/
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── entries/          # Entry management components
│   ├── layout/           # Layout components
│   ├── reports/          # Chart and analytics components
│   └── ui/               # ShadCN UI components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── hooks/                # Custom React hooks
└── ...configuration files
```

## <a name="features">🔋 Features</a>

MoodTracker is packed with features that ensure an efficient, secure, and user-friendly wellness tracking experience:

- **👤 User Registration & Authentication**  
  Secure user registration and login system with JWT token authentication.

- **📊 Daily Mood Tracking**  
  Log daily mood entries with sleep, stress, symptoms, mood, and engagement levels on a scale of 1-5.

- **📈 Visual Analytics Dashboard**  
  Beautiful charts and graphs to visualize mood trends, sleep patterns, and wellness correlations.

- **📅 Entry Management**  
  Create, edit, and delete mood entries with notes and medication tracking.

- **📱 Fully Responsive UI**  
  The application is fully responsive and optimized for mobile, tablet, and desktop usage.

- **🔒 Secure Data Storage**  
  All data is securely stored using Prisma ORM with proper authentication and authorization.

- **📋 Wellness Reports**  
  Comprehensive reports showing mood trends, sleep-mood correlations, and weekly averages.

- **🎯 Goal Tracking**  
  Track your wellness goals and monitor progress over time.

- **🌙 Light Theme Only**  
  Clean, consistent light theme interface for positive vibes and better mood tracking.

- **⚡ Real-time Updates**  
  Instant updates and notifications using React state management and toast notifications.

- **🧱 Scalable Architecture**  
  Built with reusable components and clean architecture for easier maintenance and scalability.

- **🔐 Protected Routes**  
  Secure authentication middleware protecting user data and dashboard access.

- **🎨 Modern UI/UX**  
  Beautiful, intuitive interface built with ShadCN UI components and TailwindCSS.

> ...and many more features to ensure seamless wellness tracking, maintainable code, and a delightful user experience.

## Core Features

### User Features
- User registration and secure authentication
- Daily mood entry logging system
- Personal wellness dashboard
- Mood and sleep pattern tracking
- Notes and medication logging
- Entry history and management

### Analytics Features
- Mood trend visualization
- Sleep-mood correlation analysis
- Weekly and monthly averages
- Wellness score calculation
- Interactive charts and graphs
- Progress tracking over time

### Technical Features
- Responsive design for all devices
- Secure database with Prisma ORM
- JWT authentication with secure cookies
- Type-safe development with TypeScript
- Modern UI components with ShadCN
- Server-side rendering with Next.js
- Real-time data updates
- Form validation with Zod

## Setup Requirements
- Node.js 18+ 
- npm/yarn/pnpm
- Git

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (version 18 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/yourusername/mood-tracker.git
cd mood-tracker
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Database**

Initialize the Prisma database:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) View database in Prisma Studio
npx prisma studio
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (generate a random secret key)
JWT_SECRET="your-super-secret-jwt-key-here"

# NextJS
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"
```

Replace the placeholder values with your actual configuration. For JWT_SECRET, generate a secure random string.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma studio    # Open Prisma Studio

# Utilities
npm run lint         # Run ESLint
```

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration  
- `GET /api/auth/me` - Get current user
- `GET /api/entries` - Get user entries
- `POST /api/entries` - Create new entry
- `PUT /api/entries/[id]` - Update entry
- `DELETE /api/entries/[id]` - Delete entry

## Database Schema

The application uses Prisma with SQLite and includes:

- **User** - User accounts and authentication
- **Entry** - Mood tracking entries with sleep, stress, mood, etc.
- **Timestamps** - Created and updated timestamps for all records

## Production Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Set up production database**
3. **Configure environment variables**
4. **Deploy to your preferred hosting service** (Vercel, Netlify, etc.)

## Security Features
- JWT token authentication
- Secure password hashing with bcrypt
- Protected API routes
- CORS configuration
- Environment variable protection
- SQL injection prevention with Prisma

## Performance Optimization
- Server-side rendering with Next.js
- Image optimization
- Code splitting and lazy loading
- Optimized database queries
- Efficient state management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Show your support

Give a ⭐️ if this project helped you track your wellness journey!

<div align="center">
Built with ❤️ by Surya
</div>
