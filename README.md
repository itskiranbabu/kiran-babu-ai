# KeySpark AI - The Creator OS

Production-ready SaaS platform showcasing AI integration, digital product sales, and automated workflows. Features service booking, content generation with Gemini AI, portfolio gallery, and customer management.

## 🚀 Features

- **AI-Powered Content Generation** - Gemini AI integration for intelligent content creation
- **Authentication System** - Supabase-powered auth with demo mode fallback
- **Service Booking** - Schedule consultations and services
- **Portfolio Gallery** - Showcase your work and projects
- **CRM & Analytics** - Customer relationship management with insights
- **Responsive Design** - Mobile-first, dark mode optimized

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Google Gemini API
- **Deployment**: Vercel
- **Routing**: React Router v7

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (optional - app works in demo mode)
- Google Gemini API key (optional)
- Vercel account for deployment

## 🔧 Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/itskiranbabu/kiran-babu-ai.git
cd kiran-babu-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

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

**Note**: The app will run in demo mode if Supabase credentials are not provided.

### 4. Start development server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app.

## 🗄️ Supabase Setup (Optional)

If you want to use real authentication and database:

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key

### 2. Run Database Schema

Execute the SQL in `supabase_schema.sql` in your Supabase SQL editor to create the necessary tables.

### 3. Configure Environment Variables

Add your Supabase credentials to `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_API_KEY`
4. Deploy!

### 3. Environment Variables in Vercel

Go to **Project Settings → Environment Variables** and add:

```
VITE_SUPABASE_URL = your_supabase_url
VITE_SUPABASE_ANON_KEY = your_supabase_key
VITE_GEMINI_API_KEY = your_gemini_key
```

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

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

## 🔐 Demo Mode

The app includes a demo mode that works without Supabase:

- Click "Instant Admin Demo" on the login page
- All data is stored in localStorage
- Perfect for testing and demonstrations

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear node_modules: `rm -rf node_modules package-lock.json`
2. Reinstall: `npm install`
3. Clear Vite cache: `rm -rf node_modules/.vite`

### Supabase Connection Issues

If Supabase isn't connecting:

1. Verify environment variables are set correctly
2. Check Supabase project is active
3. Ensure anon key has correct permissions
4. App will automatically fall back to demo mode

### Styling Issues

If Tailwind styles aren't working:

1. Ensure `index.css` is imported in `index.tsx`
2. Check `tailwind.config.js` content paths
3. Restart dev server after config changes

## 📄 License

MIT License - feel free to use this project for your portfolio or commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

- **Email**: itskiranbabu.ai@gmail.com
- **GitHub**: [@itskiranbabu](https://github.com/itskiranbabu)

---

Built with ❤️ by Kiran Babu
