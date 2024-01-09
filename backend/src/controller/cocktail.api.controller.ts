import { Request, Response } from "express";
import axios from "axios";
import { ApiUrlService } from "~/services/ApiUrlService";
import RedisCache from "~/middleware/redis.cache";

export class CocktailApiController {

    public static async getCocktailsByName(req: Request, res: Response) {
        try {
            const name = req.params.name;
            const cacheKey = `name_${name}`;

            const cachedData = await RedisCache.get(cacheKey);

            if (cachedData) {
                res.json(JSON.parse(cachedData));
            } else {
                const response = await axios.get(ApiUrlService.SEARCH_BY_NAME + name);
                const responseData = response.data;

                RedisCache.set(cacheKey, JSON.stringify(responseData));

                res.json(responseData);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public static async getCocktailsByFirstLetter(req: Request, res: Response) {
        try {
            const letter = req.params.letter;
            const cacheKey = `letter_${letter}`;

            const cachedData = await RedisCache.get(cacheKey);

            if (cachedData) {
                res.json(JSON.parse(cachedData));
            } else {
                const response = await axios.get(ApiUrlService.SEARCH_BY_FIRST_LETTER + letter);
                const responseData = response.data;

                RedisCache.set(cacheKey, JSON.stringify(responseData));

                res.json(responseData);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public static async getRandomCocktail(req: Request, res: Response, amount: number) {
        try {
            const response = await axios.get(ApiUrlService.RANDOM);
            res.json(response.data);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public static async getCocktailsByIngredient(req: Request, res: Response) {
        try {
            const name = req.params.name;
            const cacheKey = `ingredient_${name}`;

            const cachedData = await RedisCache.get(cacheKey);

            if (cachedData) {
                res.json(JSON.parse(cachedData));
            } else {
                const response = await axios.get(ApiUrlService.SEARCH_BY_INGREDIENT + name);
                const responseData = response.data;

                RedisCache.set(cacheKey, JSON.stringify(responseData));

                res.json(responseData);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public static async getCocktailById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const cacheKey = `id_${id}`;

            const cachedData = await RedisCache.get(cacheKey);

            if (cachedData) {
                res.json(JSON.parse(cachedData));
            } else {
                const response = await axios.get(ApiUrlService.SEARCH_BY_ID + id);
                const responseData = response.data;

                RedisCache.set(cacheKey, JSON.stringify(responseData));

                res.json(responseData);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}