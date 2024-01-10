import express from "express";
import router from "./routes/routeIndex";
import cors from "cors";
import RedisCache from "./middleware/redis.cache";
import { SQLiteDatabase } from "./database/database.config";
export class App {
    public app: express.Application;
    public port: number;
    private db: SQLiteDatabase;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeCache();
        this.initializeRoutes(router);
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private initializeCache() {
        RedisCache.initialize();
    }

    private initializeRoutes(router: express.Router) {
        this.app.use(router);
    }

    public initializeDb() {
        SQLiteDatabase.initialize();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}