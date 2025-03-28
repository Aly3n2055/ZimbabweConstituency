# Kuwadzana West Constituency Web App - Deployment Guide

This document provides comprehensive instructions for deploying the Kuwadzana West Constituency Web Application to various environments.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Local Development Setup](#local-development-setup)
3. [Production Deployment](#production-deployment)
   - [Netlify Deployment](#netlify-deployment)
   - [Traditional Hosting](#traditional-hosting)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)
6. [Troubleshooting](#troubleshooting)

## Quick Start

To quickly get the application running in development mode:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at http://localhost:5000.

## Local Development Setup

### Prerequisites

- Node.js v18+ and npm
- PostgreSQL database (locally or remote)

### Setup Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kuwadzana-west-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/database_name
   SESSION_SECRET=your_secure_session_secret
   ```

4. Run database migrations:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Production Deployment

### Netlify Deployment

Detailed instructions for deploying to Netlify are available in the [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) file.

#### Quick Netlify Deployment Steps

1. Ensure your code is committed to a Git repository (GitHub, GitLab, BitBucket)
2. Set up a PostgreSQL database service (Neon, Supabase, Railway, etc.)
3. Deploy to Netlify:
   - Connect your repo via the Netlify UI
   - Configure build settings:
     - Build command: `./build-netlify.sh`
     - Publish directory: `dist/public`
   - Set environment variables (DATABASE_URL, SESSION_SECRET)

4. Run database migrations:
   ```bash
   DATABASE_URL=your_postgresql_connection_string npm run db:push
   ```

### Traditional Hosting

For traditional web hosting environments:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the contents of `dist/` to your server
   - Frontend: `dist/public/` directory should be served by a web server like Nginx/Apache
   - Backend: `dist/index.js` should be run using Node.js:
     ```bash
     NODE_ENV=production node dist/index.js
     ```

3. Set environment variables on your server:
   - DATABASE_URL
   - SESSION_SECRET

4. Run database migrations:
   ```bash
   npm run db:push
   ```

## Database Setup

### PostgreSQL Setup

This application uses PostgreSQL. You need a PostgreSQL database for both development and production.

#### Local PostgreSQL Setup

1. Install PostgreSQL on your local machine
2. Create a database:
   ```sql
   CREATE DATABASE kuwadzana_west;
   ```
3. Create a database user (optional):
   ```sql
   CREATE USER app_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE kuwadzana_west TO app_user;
   ```

#### Cloud PostgreSQL Options

- [Neon](https://neon.tech/) - Free tier available, serverless PostgreSQL
- [Supabase](https://supabase.com/) - PostgreSQL with additional features
- [Railway](https://railway.app/) - Simple PostgreSQL hosting
- [ElephantSQL](https://www.elephantsql.com/) - PostgreSQL as a service

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| DATABASE_URL | PostgreSQL connection URL | Yes | None |
| SESSION_SECRET | Secret for session encryption | Yes | None |
| PORT | Port for the server to listen on | No | 5000 |
| NODE_ENV | Application environment | No | development |

## Troubleshooting

### Common Issues

1. **Connection to PostgreSQL fails**
   - Verify the DATABASE_URL is correct
   - Check network permissions (firewalls, database access settings)
   - Try connecting with a PostgreSQL client (psql, pgAdmin)

2. **Build process fails**
   - Ensure all dependencies are installed: `npm ci`
   - Check for TypeScript errors: `npm run check`
   - Try cleaning the cache: `rm -rf node_modules/.cache`

3. **Authentication issues**
   - Verify SESSION_SECRET is set
   - Check for issues with session storage
   - Ensure cookies are being set correctly

4. **Database schema issues**
   - Run `npm run db:push` to ensure the schema is up to date
   - Check for database migration errors in the logs

## Testing the Build

You can test the build process locally before deploying:

```bash
./test-build.sh
```

This script will:
1. Clean previous build artifacts
2. Run the build process
3. Provide a summary of the output files
4. Suggest commands to test the static file serving

## Additional Resources

- For detailed local setup, see [DEPLOYMENT.md](./DEPLOYMENT.md)
- For Netlify-specific deployment, see [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)