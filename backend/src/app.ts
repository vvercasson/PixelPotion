import express from "express";
import router from "./routes/routeIndex";
import cors from "cors";
import RedisCache from "./middleware/redis.cache";
import bodyParse from "body-parser";
import swaggerJsDoc from 'swagger-jsdoc';
import {serve, setup} from 'swagger-ui-express'

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
        this.initializeSwagger();
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParse.json({ limit: '10mb' }));
        this.app.use(bodyParse.urlencoded({ limit: '10mb', extended: true }));
    }

    private initializeSwagger() {
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "PixelPotion API",
                    version: "0.1",
                    description: "An API to access a collection of cocktail recipes. It provides functionalities to search for cocktails by name, ingredient, ID, and retrieve random information.",
                },
            },
            /* servers: [
                {
                    url: 'http://localhost:3001',
                    description: 'backend server for PixelPotion'
                }
            ], */
            apis: ["./routes/*.ts", "./models/*.ts", "./controller/*.ts"],
        };

        const swaggerSpec = swaggerJsDoc(options);
        this.app.use("/docs", serve, setup(swaggerSpec));
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