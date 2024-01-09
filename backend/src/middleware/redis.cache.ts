import * as redis from 'redis';

class RedisCache {

    private static readonly REDIS_URL = 'redis://redis:6379';
    private static client: redis.RedisClientType;

    private constructor() {
    }

    public static initialize(): void {
        RedisCache.client = redis.createClient({
            url: RedisCache.REDIS_URL
        });

        RedisCache.client.on('error', (err) => {
            console.error('Redis Error:', err);
        });

        RedisCache.client.on('ready', () => {
            console.log('Redis client ready');
        });

        (async () => {
            try {
                await RedisCache.client.connect();
            } catch (error) {
                console.error('Failed to connect to Redis', error);
            }
        })();
    }

    public static set(key: string, value: string): void {
        RedisCache.client.set(key, value);
    }

    public static get(key: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            this.client.get(key)
                .then((value) => {
                    resolve(value);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public static close(): void {
        this.client.quit();
    }

}

RedisCache.initialize();

export default RedisCache;