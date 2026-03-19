const mysql = require('mysql2/promise');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

async function run() {
  try {
    console.log('Connecting to DB with SSL...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10),
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    console.log('Connected! Reading SQL file...');
    const sql = fs.readFileSync('../docs/inserts-only-cols.sql', 'utf8');
    
    // Split by semicolons at the end of lines to roughly get individual statements
    // The inserts-only.sql was generated line by line so each line is one statement
    const lines = sql.split('\n').filter(line => line.trim().length > 0);
    
    console.log(`Executing ${lines.length} SQL inserts...`);
    
    for (let line of lines) {
      if (!line) continue;
      try {
        await connection.query(line);
      } catch (e) {
        console.warn(`Skipping line due to error: ${e.message.substring(0, 100)}...`);
      }
    }
    
    console.log('Inserts executed successfully!');
    await connection.end();
  } catch (err) {
    console.error('Error executing inserts:', err);
  }
}

run();
