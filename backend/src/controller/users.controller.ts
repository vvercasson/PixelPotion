import { Request, Response } from "express";
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

const dbPath = path.resolve(__dirname, '../database/database.sqlite');
const db = new sqlite3.Database(dbPath);

export class UsersController {

    db = new sqlite3.Database(dbPath);

    public static async postUser(req: Request, res: Response) {
        console.log('postUser');
        const { username, password } = req.body;

        console.log('username', username);

        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');

        const insertion = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        insertion.run(username, password);
        insertion.finalize();

        res.status(201).json({ message: 'User created successfully' });
    }

    public static async getUserss(req: Request, res: Response) {
        const userName = req.params.username;

        const query = 'SELECT * FROM users WHERE username = ?';

        db.get(query, userName, (err: any, row: any) => {
            if (err) {
                return console.error(err.message);
            }
            if (row) {
                res.json({
                    message: 'User fetched successfully',
                    user: row
                });
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    }

    public static async getUser(req: Request, res: Response) {
        const { username, password } = req.body;

        console.log('Query now');

        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

        db.get(query, [username, password], (err: any, row: any) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: err.message });
                return;
            }
            if (row) {
                console.log('User found');
                res.status(200).json({ message: 'Authentication successful', user: row });
            } else {
                console.log('No user found');
                res.status(401).json({ message: 'Authentication failed' });
            }
        });
    }
}