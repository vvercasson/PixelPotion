import sqlite3 from 'sqlite3';

const dbPath = '../database/database.sqlite';

const db = new sqlite3.Database(dbPath);

// Create a table
db.serialize(() => {
  db.run('CREATE TABLE users (username TEXT PRIMARY KEY, password TEXT)');
});

// Close the database connection
db.close();