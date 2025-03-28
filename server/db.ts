import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { log } from './vite';

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Please check DEPLOYMENT.md for configuration instructions.",
  );
}

// Function to determine if we're using a local PostgreSQL database
function isLocalPostgres() {
  const databaseURL = process.env.DATABASE_URL || '';
  return databaseURL.includes('localhost') || databaseURL.includes('127.0.0.1');
}

// Configure PostgreSQL connection
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Initialize connection
try {
  log(`Initializing database connection: ${isLocalPostgres() ? 'Local PostgreSQL' : 'Remote PostgreSQL'}`, 'database');
  
  // If you're having SSL issues with local development, you could add:
  // if (!isLocalPostgres()) {
  //   neonConfig.wsProxy = (host) => `${host}`;
  // }
  
  // Test the connection
  pool.query('SELECT NOW()').then(() => {
    log('✅ Database connection established successfully', 'database');
  }).catch(err => {
    log(`❌ Database connection error: ${err.message}`, 'database');
  });
} catch (error) {
  log(`❌ Failed to initialize database: ${error}`, 'database');
}

// Create Drizzle ORM instance
export const db = drizzle({ client: pool, schema });
