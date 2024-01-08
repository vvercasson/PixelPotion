const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

const dbPath = path.resolve(__dirname, '../database/database.sqlite');
const db = new sqlite3.Database(dbPath);

router.post('/', (req, res) => {
  const { username, password } = req.body;

  console.log('username', username);

  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');

  const insertion = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  insertion.run(username, password);
  insertion.finalize();

  res.status(201).json({ message: 'User created successfully' });
});

process.on('SIGINT', () => {
  db.close();
  process.exit();
});

module.exports = router;
