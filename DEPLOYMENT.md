# Deployment Guide

This guide will help you deploy your Airbnb Clone v2 application with a PostgreSQL database.

## 🚀 Quick Deployment to Vercel

### 1. Database Setup

You have several options for the database:

#### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Create a new Postgres database
3. Copy the connection string to your environment variables

#### Option B: Supabase (Free tier available)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database connection string

#### Option C: Railway

1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL service
3. Get your connection string

### 2. Environment Variables

Set these in your Vercel dashboard:

```env
# Database
DATABASE_URL="your-postgres-connection-string"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.vercel.app"

# API (optional)
NEXT_PUBLIC_API_URL="https://your-domain.vercel.app"
```

### 3. Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables
4. Deploy!

### 4. Post-Deployment Setup

After deployment, you need to set up the database:

1. **Run migrations**: Vercel will automatically run `prisma migrate deploy` during build
2. **Seed the database**: Visit `/admin` on your deployed site and click "Seed Database"

## 🐳 Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. Create docker-compose.yml

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/airbnb_clone
      - NEXTAUTH_SECRET=your-secret
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=airbnb_clone
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 3. Deploy with Docker

```bash
docker-compose up -d
```

## 🔧 Manual Server Deployment

### 1. Server Requirements

- Node.js 18+
- PostgreSQL 12+
- PM2 (for process management)

### 2. Setup Steps

```bash
# Clone repository
git clone <your-repo>
cd airbnb-clone-v2

# Install dependencies
npm install

# Set environment variables
cp env.example .env.local
# Edit .env.local with your values

# Build the application
npm run build

# Set up database
npm run setup-db

# Start the application
npm start
```

### 3. Using PM2

```bash
# Install PM2
npm install -g pm2

# Start the application
pm2 start npm --name "airbnb-clone" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

## 📊 Monitoring and Maintenance

### Database Backups

```bash
# Create backup
pg_dump $DATABASE_URL > backup.sql

# Restore backup
psql $DATABASE_URL < backup.sql
```

### Logs

```bash
# View application logs
pm2 logs airbnb-clone

# View database logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

### Health Checks

- Application: `GET /api/health`
- Database: Check connection in `/admin`

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Database**: Use strong passwords and restrict access
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: Consider adding rate limiting to API endpoints
5. **CORS**: Configure CORS properly for your domain

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check `DATABASE_URL` format
   - Verify database is running
   - Check firewall settings

2. **Build Failures**

   - Ensure all dependencies are installed
   - Check TypeScript errors
   - Verify environment variables

3. **API Errors**
   - Check database migrations
   - Verify API routes are correct
   - Check server logs

### Getting Help

- Check the application logs
- Visit `/admin` for database status
- Review the README.md for setup instructions
- Create an issue in the repository
