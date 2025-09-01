# Airbnb Clone v2 - Luxury Vacation Rentals Platform

A modern, animated, and user-friendly vacation rental platform built with Next.js 14, featuring stunning visual effects and smooth interactions.

## ✨ Features

- **Modern Design**: Beautiful, responsive UI with smooth animations
- **Interactive Search**: Advanced search with location, dates, and guest filters
- **Property Showcase**: Featured properties with detailed information
- **Category Exploration**: Browse properties by type (Beach, Mountain, City, etc.)
- **Property Details**: Comprehensive property pages with image galleries
- **Booking System**: Interactive booking forms with date selection
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: Framer Motion powered interactions
- **Mock Data**: Sample properties for demonstration

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (React 18+)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **TypeScript**: Full type safety
- **Database**: Prisma ORM (PostgreSQL ready)
- **Authentication**: NextAuth.js ready
- **Image Management**: Cloudinary ready
- **Maps**: Mapbox ready

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd airbnb-clone-v2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/airbnb_clone"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"

   # Mapbox
   NEXT_PUBLIC_MAPBOX_TOKEN="your-mapbox-token"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

The application now uses a PostgreSQL database with Prisma ORM. Follow these steps to set up your database:

### Option 1: Quick Setup (Recommended)

Run the automated setup script:

```bash
npm run setup-db
```

This will:

- Run database migrations
- Generate Prisma client
- Seed the database with sample data

### Option 2: Manual Setup

1. **Set up your database**

   - Create a PostgreSQL database
   - Update your `DATABASE_URL` in `.env.local`

2. **Run migrations**

   ```bash
   npm run db:migrate
   ```

3. **Generate Prisma client**

   ```bash
   npm run db:generate
   ```

4. **Seed the database**
   ```bash
   npm run db:seed
   ```

### Database Management

- **View database**: `npm run db:studio` (opens Prisma Studio)
- **Reset database**: `npm run db:migrate -- --reset`
- **Seed database**: `npm run db:seed`

### API Endpoints

The application now includes REST API endpoints:

- `GET /api/properties` - Fetch all properties with filtering
- `GET /api/properties/[id]` - Fetch a specific property
- `POST /api/seed` - Seed the database with sample data

### Environment Variables

Make sure your `.env.local` includes:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/airbnb_clone"

# API (optional, defaults to same origin)
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 🚀 Deployment to Vercel

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Environment Variables in Vercel**
   - Go to your project settings
   - Add all variables from your `.env.local` file
   - Update `NEXTAUTH_URL` to your production domain

## 📱 Project Structure

```
airbnb-clone-v2/
├── src/
│   ├── app/                 # Next.js 14 app directory
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── location/       # Property detail pages
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── HeroSection.tsx # Hero section
│   │   ├── PropertyCard.tsx # Property cards
│   │   └── ...            # Other components
│   ├── lib/               # Utility functions
│   ├── store/             # Zustand state management
│   └── types/             # TypeScript definitions
├── prisma/                # Database schema
├── public/                # Static assets
└── styles/                # Global styles
```

## 🎨 Customization

### Colors

Update the color scheme in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fef2f2',
        500: '#ef4444',
        600: '#dc2626',
      }
    }
  }
}
```

### Animations

Modify animation settings in component files:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  {/* Content */}
</motion.div>
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup-db` - Set up database (migrations + seed)
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 📊 Performance

- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: WebP format with lazy loading
- **Code Splitting**: Dynamic imports for better performance
- **Animation Performance**: 60fps smooth animations

## 🌟 Future Enhancements

### Phase 2

- [ ] User authentication and profiles
- [ ] Booking management system
- [ ] Review and rating system
- [ ] Host dashboard

### Phase 3

- [ ] Payment integration
- [ ] Messaging system
- [ ] Advanced analytics
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Unsplash](https://unsplash.com/) - Beautiful images
- [Lucide](https://lucide.dev/) - Icon library

## 📞 Support

If you have any questions or need help:

- Create an issue in this repository
- Check the documentation
- Reach out to the development team

---

**Happy coding! 🚀**
