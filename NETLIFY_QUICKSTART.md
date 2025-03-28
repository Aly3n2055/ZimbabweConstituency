# Kuwadzana West Constituency - Netlify Deployment Quick Guide

This quick guide will help you deploy the Kuwadzana West Constituency Web App to Netlify.

## Prerequisites
- A Netlify account
- A PostgreSQL database (Neon, Supabase, etc.)

## 1. Set Up Your Database

1. Create a PostgreSQL database from a service like [Neon](https://neon.tech/) (recommended for its free tier)
2. Save your database connection URL (`postgres://username:password@host:port/database`)

## 2. Deploy to Netlify

### Step A: Connect Your Repository

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "Add new site" > "Import an existing project" 
3. Connect to your Git provider and select this repository

### Step B: Configure Build Settings

1. Set the build settings:
   - **Build command**: `./build-netlify.sh`
   - **Publish directory**: `dist/public`

2. Add these environment variables:
   ```
   DATABASE_URL = your_postgresql_connection_string
   SESSION_SECRET = your_secure_random_string
   ```

3. Click "Deploy site"

## 3. Run Database Migrations

After the site is deployed, you need to set up the database schema.

Option 1: Using Netlify CLI
```bash
netlify login
netlify functions:invoke db-migrate
```

Option 2: Manually
```bash
DATABASE_URL=your_postgresql_connection_string npm run db:push
```

## 4. Verify Deployment

1. Visit your Netlify site URL
2. Test login and registration functionality
3. Verify that the database is properly connected

## Troubleshooting

If you encounter issues:

1. Check Netlify deploy logs
2. Verify environment variables are set correctly
3. Ensure your database allows connections from Netlify's IP range
4. Try rebuilding the site after fixing issues

For more detailed instructions, see the full [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) file.