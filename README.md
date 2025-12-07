<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# KeySpark AI - The Creator OS

A comprehensive AI-powered platform for content creators, featuring workflow automation, content repurposing, CRM, analytics, and more.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account (for authentication)
- Google Gemini API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/itskiranbabu/kiran-babu-ai.git
   cd kiran-babu-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Gemini AI
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   
   # Supabase (for authentication)
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Set up Supabase database**
   
   ⚠️ **IMPORTANT:** To fix login issues, follow the [Supabase Setup Guide](./SUPABASE_SETUP.md)
   
   Quick steps:
   - Run the SQL schema from `supabase_schema.sql` in your Supabase SQL Editor
   - **Disable email confirmation** in Supabase Dashboard → Authentication → Settings
   - See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🔧 Fixing Login Issues

If you encounter **"Email not confirmed"** error when logging in:

1. **Quick Fix:** Disable email confirmation in Supabase
   - Go to Supabase Dashboard → Authentication → Settings
   - Disable "Enable email confirmations"
   - Save changes

2. **Manual Fix:** Confirm existing users
   - Run the SQL script from `scripts/confirm-user.sql` in Supabase SQL Editor
   - Replace email with your user's email

3. **Full Guide:** See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for comprehensive instructions

## 📚 Documentation

- **[Supabase Setup Guide](./SUPABASE_SETUP.md)** - Complete authentication setup
- **[User Confirmation Script](./scripts/confirm-user.sql)** - Manually confirm users

## 🌟 Features

- **AI Workflow Automation** - Create and execute multi-step AI workflows
- **Content Repurposing** - Transform content across platforms (Instagram, LinkedIn, Twitter, YouTube)
- **Smart CRM** - AI-powered lead analysis and outreach
- **Analytics Dashboard** - Track performance and insights
- **Calendar Integration** - Schedule and manage content
- **Templates Library** - Pre-built templates for common tasks
- **AI Avatar** - Personalized AI assistant

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini 2.0
- **Routing:** React Router v6
- **Icons:** Lucide React

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 🚀 Deploy

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app is a standard Vite React app and can be deployed to:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Any static hosting service

## 🐛 Troubleshooting

### Login Issues
- See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- Check Supabase credentials in `.env`
- Verify email confirmation is disabled

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)
- Verify all environment variables are set

### AI Features Not Working
- Verify `VITE_GEMINI_API_KEY` is set correctly
- Check API key has proper permissions
- Review browser console for errors

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review Supabase logs for authentication issues

---

**Built with ❤️ by Kiran Babu**

View in AI Studio: https://ai.studio/apps/drive/1tL-5c2sHDTyz5PZy3aKWykmoubcj9l7j
