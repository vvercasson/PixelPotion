import { Database } from 'sqlite3';

import { Sequelize } from 'sequelize';
import { UserModel } from './db_models/User';
import { CocktailFavoriteModel } from './db_models/CocktailFavorite';

export class SQLiteDatabase {
    private static readonly FILE_PATH: string = './database.sqlite';
    public static db: Database;
    public static sequelize: Sequelize;

    constructor() {
    }

    public static initialize() {
        SQLiteDatabase.db = new Database(SQLiteDatabase.FILE_PATH, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database.');
        });

        SQLiteDatabase.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: SQLiteDatabase.FILE_PATH
        });

        this.createModels();
        this.sequelize.sync();
    }

    public static createModels() {
        UserModel.defineUserModel(SQLiteDatabase.sequelize);
        CocktailFavoriteModel.defineCocktailModel(SQLiteDatabase.sequelize);
    }
}