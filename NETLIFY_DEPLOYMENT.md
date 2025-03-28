# Kuwadzana West Constituency Web App - Netlify Deployment Guide

This guide provides comprehensive instructions for deploying the Kuwadzana West Constituency Web Application to Netlify.

## Prerequisites

Before starting the deployment process, make sure you have:

- A [Netlify](https://www.netlify.com/) account
- Access to your project's Git repository
- A PostgreSQL database service (such as [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/))

## Deployment Steps

### 1. Set Up Your PostgreSQL Database

1. Create a PostgreSQL database from your selected provider (Neon, Supabase, Railway, etc.)
2. Note down your database connection URL (typically in the format: `postgres://username:password@hostname:port/database`)

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify UI (Recommended for first-time setup)

1. Log in to your Netlify account at [app.netlify.com](https://app.netlify.com/)
2. Click "Add new site" > "Import an existing project" 
3. Connect to your Git provider (GitHub, GitLab, BitBucket) and select your repository
4. Configure build settings:
   - **Build command**: `./build-netlify.sh`
   - **Publish directory**: `dist/public`
5. Expand the "Advanced build settings" section and add these environment variables:
   ```
   DATABASE_URL = your_postgresql_connection_string
   SESSION_SECRET = your_secure_random_string
   ```
6. Click "Deploy site"

#### Option B: Deploy using Netlify CLI

1. Install the Netlify CLI: 
   ```bash
   npm install -g netlify-cli
   ```
2. Log in to your Netlify account: 
   ```bash
   netlify login
   ```
3. Initialize your project (if not already done): 
   ```bash
   netlify init
   ```
4. Set environment variables:
   ```bash
   netlify env:set DATABASE_URL your_postgresql_connection_string
   netlify env:set SESSION_SECRET your_secure_random_string
   ```
5. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

### 3. Database Schema Setup

After deploying, you need to run database migrations to set up the schema:

#### Method 1: Run migrations manually (easier for one-time setup)

1. Make sure you have the Netlify CLI installed and are logged in
2. Run the db:push command with the correct environment:
   ```bash
   DATABASE_URL=your_postgresql_connection_string npm run db:push
   ```

#### Method 2: Set up a build plugin or function (for automated migrations)

For more advanced setups, you can create a Netlify build plugin or function to automatically run migrations during deployment. Refer to the Netlify documentation for details.

## Environment Variables

Here are the environment variables your application needs:

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgres://user:pass@host:5432/db |
| SESSION_SECRET | Secret for securing sessions | random_string_at_least_32_chars |

## Custom Domain Setup (Optional)

To use a custom domain for your application:

1. Go to your site dashboard in Netlify
2. Navigate to Site settings > Domain management > Custom domains
3. Click "Add custom domain"
4. Follow the DNS configuration instructions provided by Netlify

## Continuous Deployment

Netlify automatically sets up continuous deployment from your Git repository. Any changes pushed to your main branch will trigger a new build and deployment.

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Netlify build logs for specific error messages
   - Ensure your `build-netlify.sh` script has execute permissions (`chmod +x build-netlify.sh`)
   - Verify the build command and publish directory are set correctly

2. **Database Connection Issues**:
   - Confirm your DATABASE_URL is correctly formatted
   - Verify that your database allows connections from Netlify's IP range
   - Check that the database user has the necessary permissions

3. **Missing Environment Variables**:
   - Ensure all required environment variables are set in Netlify
   - Variables are case sensitive

4. **Redirects Not Working**:
   - The `_redirects` file should be in the publish directory
   - Verify the contents of your redirects file

## Support and Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Support Forum](https://answers.netlify.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

For project-specific issues, please contact the development team.