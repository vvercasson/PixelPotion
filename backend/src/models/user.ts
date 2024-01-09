import sqlite3 from 'sqlite3';

const dbPath = '../database/database.sqlite';
const db = new sqlite3.Database(dbPath);

const initDatabase = () => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
};

const addUser = (username: string, password: string) => {
  const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  stmt.run(username, password);
  stmt.finalize();
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export { initDatabase, addUser, getAllUsers };
