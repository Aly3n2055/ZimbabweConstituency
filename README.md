# Kuwadzana West Constituency Web Application

A dynamic web application for the Kuwadzana West ZANU-PF constituency, designed to enhance community engagement and communication through modern digital tools.

## Features

- Responsive design for all device sizes
- Community engagement portal
- News and updates section
- Development projects showcase
- Leadership directory
- Event calendar
- Resources section with government services
- Emergency contacts and funding opportunities
- FAQs and constituency reports

## Technologies Used

- React (frontend library)
- TypeScript (type-safe JavaScript)
- Express.js (backend framework)
- TanStack Query (data fetching)
- Tailwind CSS (styling)
- Shadcn UI (component library)
- Drizzle ORM (database management)
- PostgreSQL (database)

## Deploying to Netlify

### Step 1: Export the Code as ZIP

Download the full project code as a ZIP file from Replit.

### Step 2: Deploy to Netlify

1. Log in to your Netlify account (or create one at [netlify.com](https://www.netlify.com))
2. Click on "Sites" > "Add new site" > "Import an existing project"
3. Drag and drop the ZIP file or select it from your computer
4. Netlify will automatically detect the configuration from the `netlify.toml` file
5. Click "Deploy site"

### Step 3: Configure Environment Variables

After deployment, go to:
1. Site settings > Environment variables
2. Add the required environment variables:
   - `DATABASE_URL`: Your PostgreSQL database URL
   - Any other environment variables used in your application

### Step 4: Set Up Database

1. Provision a PostgreSQL database (Netlify partners with Neon for serverless PostgreSQL)
2. Run the database migrations using Drizzle

### Additional Information

- The application uses the `/dist` directory for the built assets
- The `netlify.toml` file contains all the necessary configuration for deployment
- All API routes will be served as serverless functions automatically