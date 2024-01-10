import { Request, Response } from "express";
import axios from "axios";
import { SQLiteDatabase } from "~/database/database.config";

export class CustomCocktailController {
    public static async getCustomCocktailsByName(req: Request, res: Response) {
        try {
            const name = req.params.name;

            const query = 'SELECT * FROM customCocktails WHERE name = ?';
            SQLiteDatabase.db.all(query, [name], (err: any, rows: any) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
                    return;
                }
                if (rows) {
                    console.log('Custom cocktail found');
                    res.status(200).json({ message: 'Custom cocktail found', customCocktails: rows });
                }
                else {
                    console.log('Custom cocktail not found');
                    res.status(404).json({ message: 'Custom cocktail not found', customCocktails: [] });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    public static async postCustomCocktail(req: Request, res: Response) {
        try {
            const { userId, name, ingredients, instructions, image } = req.body;

            const insertion = SQLiteDatabase.db.prepare('INSERT INTO customCocktails (userId, name, ingredients, instructions, image) VALUES (?, ?, ?, ?, ?)');
            insertion.run(userId, name, ingredients, instructions, image);
            insertion.finalize();

            res.status(201).json({ message: 'Custom cocktail created successfully' });
        } catch (error) {
            console.log(error);
        }
    }
}