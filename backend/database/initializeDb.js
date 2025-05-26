// database/initializeDb.js
const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

async function initializeDatabase() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf-8');
    const connection = await pool.getConnection();
    
    // Split the SQL file into separate statements
    const statements = sql.split(';').filter(statement => statement.trim());
    
    for (const statement of statements) {
      await connection.query(statement);
    }
    
    console.log('Database initialized successfully');
    connection.release();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run only when this file is executed directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;