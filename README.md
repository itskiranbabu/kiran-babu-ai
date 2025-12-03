# KeySpark AI - The Creator OS

[![CI/CD Pipeline](https://github.com/itskiranbabu/kiran-babu-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/itskiranbabu/kiran-babu-ai/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Production-ready SaaS platform showcasing AI integration, digital product sales, and automated workflows. Features service booking, content generation with Gemini AI, portfolio gallery, customer management, and comprehensive testing infrastructure.

## ✨ Features

### Core Features
- **AI-Powered Content Generation** - Gemini AI integration for intelligent content creation
- **Workflow Automation** - Build and execute multi-step AI workflows
- **Content Repurposing** - Transform content across multiple platforms
- **Authentication System** - Supabase-powered auth with demo mode fallback
- **Service Booking** - Schedule consultations and services
- **Portfolio Gallery** - Showcase your work and projects
- **CRM & Analytics** - Customer relationship management with insights
- **Calendar Management** - Schedule and track events
- **Responsive Design** - Mobile-first, dark mode optimized

### Quality & Testing
- **Comprehensive Test Suite** - Vitest + React Testing Library
- **Error Boundaries** - Graceful error handling throughout the app
- **Environment Validation** - Automatic configuration checking on startup
- **TypeScript Strict Mode** - Full type safety
- **ESLint Configuration** - Code quality enforcement
- **CI/CD Pipeline** - Automated testing and deployment
- **Loading States** - Consistent UX with loading indicators
- **Empty States** - User-friendly empty state components

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript 5.8, Tailwind CSS 3.4
- **Build Tool**: Vite 6.4
- **Testing**: Vitest 2.1, React Testing Library 16
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Google Gemini API
- **Deployment**: Vercel
- **Routing**: React Router v7
- **Code Quality**: ESLint, TypeScript Strict Mode

## 📋 Prerequisites

- Node.js 20+ and npm
- Supabase account (optional - app works in demo mode)
- Google Gemini API key (optional)
- Vercel account for deployment

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/itskiranbabu/kiran-babu-ai.git
cd kiran-babu-ai
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root:

```env
# Supabase Configuration (Optional - app works without it)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI (Optional)
VITE_GEMINI_API_KEY=your_gemini_api_key

# App Configuration
VITE_APP_URL=http://localhost:5173
```

**Note**: The app will run in demo mode if credentials are not provided. Environment validation runs automatically on startup.

### 3. Start Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app.

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage Goals

- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

See [TESTING.md](./TESTING.md) for comprehensive testing documentation.

## 🔍 Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Type checking
npm run type-check
```

### Build

```bash
# Production build with type checking
npm run build

# Preview production build
npm run preview
```

## 🗄️ Supabase Setup (Optional)

### 1. Create Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key

### 2. Database Schema

Execute the SQL in `supabase_schema.sql` in your Supabase SQL editor.

### 3. Configure Environment

Add credentials to `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Configure Environment Variables**
   
   In Vercel Dashboard → Project Settings → Environment Variables:
   ```
   VITE_SUPABASE_URL = your_supabase_url
   VITE_SUPABASE_ANON_KEY = your_supabase_key
   VITE_GEMINI_API_KEY = your_gemini_key
   ```

4. **Deploy!**
   - Vercel will automatically build and deploy
   - Get your production URL

### Manual Build

```bash
npm run build
```

Output will be in the `dist` directory.

## 📁 Project Structure

```
kiran-babu-ai/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline
├── components/                 # Reusable UI components
│   ├── ErrorBoundary.tsx       # Error handling
│   ├── LoadingSpinner.tsx      # Loading states
│   ├── EmptyState.tsx          # Empty state UI
│   └── ...
├── contexts/                   # React contexts
│   └── AuthContext.tsx         # Authentication
├── pages/                      # Application pages
│   ├── Dashboard.tsx
│   ├── CRM.tsx
│   ├── Workflows.tsx
│   └── ...
├── services/                   # API integrations
│   ├── geminiService.ts        # AI service
│   ├── supabaseClient.ts       # Database
│   └── mockDb.ts               # Demo data
├── tests/                      # Test files
│   ├── setup.ts                # Test configuration
│   ├── components/             # Component tests
│   └── utils/                  # Utility tests
├── utils/                      # Utility functions
│   ├── env.ts                  # Environment helpers
│   └── envValidator.ts         # Config validation
├── App.tsx                     # Main app component
├── index.tsx                   # Entry point
├── types.ts                    # TypeScript definitions
├── constants.tsx               # App constants
├── vite.config.ts              # Vite configuration
├── vitest.config.ts            # Test configuration
├── tsconfig.json               # TypeScript config
├── eslint.config.js            # ESLint config
├── tailwind.config.js          # Tailwind config
├── TESTING.md                  # Testing guide
└── README.md                   # This file
```

## 🎨 Customization

### Branding

Update colors in `tailwind.config.js`:

```js
colors: {
  brand: {
    500: '#7B2FF7', // Your primary color
  }
}
```

### Content

- Update `constants.tsx` for navigation, services, and products
- Modify `metadata.json` for SEO and social sharing
- Customize pages in the `pages/` directory

## 🔐 Demo Mode

The app includes a comprehensive demo mode:

- Click **"Instant Admin Demo"** on the login page
- All data stored in localStorage
- AI features use mock responses
- Perfect for testing and demonstrations
- No backend required

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production with type checking |
| `npm run preview` | Preview production build |
| `npm test` | Run test suite |
| `npm run test:ui` | Run tests with interactive UI |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### Supabase Connection Issues

1. Verify environment variables are set correctly
2. Check Supabase project is active
3. Ensure anon key has correct permissions
4. App will automatically fall back to demo mode

### Test Failures

```bash
# Clear test cache
npm test -- --clearCache

# Run tests in verbose mode
npm test -- --reporter=verbose
```

### Styling Issues

1. Ensure `index.css` is imported in `index.tsx`
2. Check `tailwind.config.js` content paths
3. Restart dev server after config changes

## 🔒 Security

- Environment variables validated on startup
- API keys never committed to repository
- Supabase Row Level Security (RLS) enabled
- Input sanitization on all forms
- HTTPS enforced in production

## 📊 Performance

- Code splitting with React.lazy (future enhancement)
- Optimized bundle size with Vite
- Image optimization
- Lazy loading for routes
- Service worker support (future enhancement)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new features
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Write tests for all new features
- Maintain > 80% code coverage
- Follow TypeScript strict mode
- Use ESLint configuration
- Add JSDoc comments for complex functions
- Update documentation as needed

## 📄 License

MIT License - feel free to use this project for your portfolio or commercial projects.

## 📧 Contact

- **Email**: itskiranbabu.ai@gmail.com
- **GitHub**: [@itskiranbabu](https://github.com/itskiranbabu)
- **Project**: [KeySpark AI](https://github.com/itskiranbabu/kiran-babu-ai)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Supabase](https://supabase.com/) - Backend
- [Google Gemini](https://ai.google.dev/) - AI capabilities
- [Vitest](https://vitest.dev/) - Testing framework

---

Built with ❤️ by Kiran Babu | Production-Ready SaaS Platform
