import sqlite3 from 'sqlite3';

const dbPath = '../database/database.sqlite';
// Create a new SQLite database in memory (or specify a file path)
const db = new sqlite3.Database(dbPath);

// Create a table
db.serialize(() => {
  db.run('CREATE TABLE users (username TEXT PRIMARY KEY, password TEXT)');

  // Insert data
  const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  stmt.run('john_doe', 'password123');
  stmt.finalize();

  // Query data
  db.each('SELECT * FROM users', (err, row : any) => {
    console.log(`${row.id}: ${row.username} - ${row.password}`);
  });
});

// Close the database connection
db.close();