import express from "express";
import router from "./routes/routeIndex";
import cors from "cors";
import RedisCache from "./middleware/redis.cache";

class App {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.initializeCache();
        this.initializeRoutes(router);
        this.initializeDb();
    }

    private initializeMiddlewares() {
        this.app.use(cors());
    }

    private initializeCache() {
        RedisCache.initialize();
    }

    private initializeRoutes(router: express.Router) {
        this.app.use(router);
    }

    public initializeDb() {

    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App