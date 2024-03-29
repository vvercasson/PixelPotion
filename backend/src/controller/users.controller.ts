import { Request, Response } from "express";
import { SQLiteDatabase } from "~/database/database.config";
import bcrypt from 'bcrypt';


export class UsersController {

    public static async postUser(req: Request, res: Response) {
        console.log('postUser');
        const { username, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);


        try {
            const insertion = SQLiteDatabase.db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');

            insertion.run(username, encryptedPassword, function (error: any) {
                if (error) {
                    console.error('Error during insertion:', error);

                    if (error.code === 'SQLITE_CONSTRAINT' && error.errno === 19) {
                        res.status(409).json({ message: 'Username already exists' });
                    } else {
                        res.status(500).json({ message: 'Internal server error' });
                    }
                    return;
                }

                const query = SQLiteDatabase.db.prepare('SELECT * FROM users WHERE username = ?');
                const user = query.get(username);
                query.finalize();

                if (user) {
                    res.status(201).json({ user: user, message: 'User created successfully' });
                } else {
                    res.status(500).json({ message: 'Internal server error' });
                }
            });

            insertion.finalize();
        } catch (error: any) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    public static async getUser(req: Request, res: Response) {
        const { username, password } = req.body;

        console.log('Query now');

        const query = 'SELECT * FROM users WHERE username = ?';


        SQLiteDatabase.db.get(query, [username], (err: any, row: any) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: err.message });
                return;
            }
            if (row && bcrypt.compareSync(password, row.password)) {
                console.log('User found');
                const userToSend = { ...row };
                delete userToSend.password;
                res.status(200).json({ message: 'Authentication successful', user: userToSend });
            } else {
                console.log('No user found');
                res.status(401).json({ message: 'Authentication failed' });
            }
        });
    }

    public static async getUserFavorites(req: Request, res: Response) {
        const id = req.query.userId;

        const query = 'SELECT * FROM cocktails WHERE userId = ?';

        SQLiteDatabase.db.all(query, [id], (err: any, rows: any) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: err.message });
                return;
            }
            if (rows) {
                console.log('Favorites found');
                res.status(200).json({ message: 'Favorites found', favorites: rows });
            } else {
                console.log('No favorites found');
                res.status(404).json({ message: 'No favorites found' });
            }
        });
    }

    public static async postUserFavorites(req: Request, res: Response) {
        const { userId, cocktailId } = req.body;

        const insertion = SQLiteDatabase.db.prepare('INSERT INTO cocktails (userId, cocktailId) VALUES (?, ?)');
        insertion.run(userId, cocktailId);
        insertion.finalize();

        res.status(201).json({ message: 'Favorite added successfully' });
    }

    public static async deleteUserFavorites(req: Request, res: Response) {
        const userId = req.query.userId;
        const cocktailId = req.query.cocktailId;

        const deletion = SQLiteDatabase.db.prepare('DELETE FROM cocktails WHERE userId = ? AND cocktailId = ?');
        deletion.run(userId, cocktailId);
        deletion.finalize();

        res.status(201).json({ message: 'Favorite deleted successfully' });
    }
}