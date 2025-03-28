// Netlify function to run database migrations
// This can be triggered manually or as part of a post-deployment hook

import { spawn } from 'child_process';
import { resolve } from 'path';

// Handler for the Netlify function
export async function handler(event, context) {
  console.log('Starting database migration...');
  
  try {
    // Run the database migration using drizzle-kit
    const result = await runCommand('npm', ['run', 'db:push']);
    
    console.log('Database migration completed successfully!');
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Database migration completed successfully',
        output: result 
      })
    };
  } catch (error) {
    console.error('Database migration failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Database migration failed',
        error: error.toString() 
      })
    };
  }
}

// Helper function to run a command and return its output
function runCommand(cmd, args) {
  return new Promise((resolve, reject) => {
    const process = spawn(cmd, args, { shell: true });
    
    let stdout = '';
    let stderr = '';
    
    process.stdout.on('data', (data) => {
      stdout += data.toString();
      console.log(data.toString());
    });
    
    process.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error(data.toString());
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr}`));
      }
    });
    
    process.on('error', (err) => {
      reject(err);
    });
  });
}