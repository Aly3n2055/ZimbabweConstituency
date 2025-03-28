# Kuwadzana West Constituency Web App Deployment Guide

This guide provides detailed instructions for setting up the Kuwadzana West Constituency application in both development and production environments.

## Local Development with WAMP

### Prerequisites:
- WAMP Server installed (WampServer 3.2.0 or newer)
- Node.js (v18.0.0 or newer)
- npm (8.0.0 or newer)

### Step 1: Set Up PostgreSQL in WAMP

While WAMP typically comes with MySQL, we need to install PostgreSQL separately since our application uses PostgreSQL:

1. Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. During installation:
   - Use default port (5432)
   - Set a password for the postgres user (remember this password)
   - Keep the locale settings at default

3. After installation, open pgAdmin 4 (installed with PostgreSQL) and:
   - Create a new database called `kuwadzana_west`
   - Note down the following connection details:
     - Host: localhost
     - Port: 5432
     - User: postgres
     - Password: (your password from installation)
     - Database: kuwadzana_west

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory of your project with the following content:

```
# PostgreSQL Connection
DATABASE_URL=postgres://postgres:your_password@localhost:5432/kuwadzana_west

# Session Configuration
SESSION_SECRET=your_secure_session_secret
```

Replace `your_password` with the PostgreSQL password you created during installation, and set a strong random string for `SESSION_SECRET`.

### Step 3: Run Database Migrations

To set up the database schema:

```bash
npm run db:push
```

This command uses Drizzle ORM to create all necessary tables in your database.

### Step 4: Start the Application

```bash
npm run dev
```

The application should now be running at http://localhost:5000

## Production Deployment

### Option 1: Traditional Web Hosting with PostgreSQL

#### Prerequisites:
- Web server (Apache/Nginx)
- Node.js runtime environment
- PostgreSQL database

#### Steps:

1. Set up a PostgreSQL database on your hosting platform
2. Note the connection string (typically provided by your hosting provider)
3. Update the environment variables:
   ```
   DATABASE_URL=your_production_database_url
   SESSION_SECRET=your_secure_production_secret
   ```
4. Build the application:
   ```bash
   npm run build
   ```
5. Deploy the built files to your server
6. Run database migrations:
   ```bash
   npm run db:push
   ```
7. Start the application:
   ```bash
   npm start
   ```

### Option 2: Deploy to Netlify with Managed Database

#### Database Setup:
1. Create a PostgreSQL database with a provider like Neon, Supabase, or Railway
2. Obtain the connection string for your database

#### Netlify Setup:
1. Log in to your Netlify account
2. Create a new site from Git
3. Connect to your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables:
   - DATABASE_URL: `your_production_database_url`
   - SESSION_SECRET: `your_secure_production_secret`
6. Deploy the site
7. Run database migrations using the Netlify CLI:
   ```bash
   netlify login
   netlify env:set DATABASE_URL your_production_database_url
   netlify functions:invoke db-migrate
   ```

## Database Schema Migration

Whenever you make changes to the database schema in `shared/schema.ts`, you need to run migrations:

### Local Development:
```bash
npm run db:push
```

### Production:
After deploying your application with updated schema:
```bash
npm run db:push
```

## Backup and Restore

### Create Database Backup
```bash
pg_dump -U postgres -h localhost -p 5432 -d kuwadzana_west > backup.sql
```

### Restore Database from Backup
```bash
psql -U postgres -h localhost -p 5432 -d kuwadzana_west < backup.sql
```

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**:
   - Check if PostgreSQL service is running
   - Verify the connection details in your .env file
   - Ensure network permissions allow the connection

2. **Migration Errors**:
   - Ensure your PostgreSQL user has permissions to create tables
   - Check if the database exists

3. **Application Not Starting**:
   - Verify all required environment variables are set
   - Check the application logs for specific error messages

If you encounter any other issues, please contact the development team for support.