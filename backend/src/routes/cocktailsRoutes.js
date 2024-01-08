const express = require('express');
const axios = require('axios');
const router = express.Router();

// test redis
const redis = require('redis');


const redisClient = redis.createClient({
    url:'redis://redis:6379'
});

redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server',err);
});

/* const testRedis = async () => {
    try {
        await redisClient.connect();
        console.log("test ")
        await redisClient.set('key', 'value');
        const value = await redisClient.get('key');
        console.log(value);
    } catch (error) {
        console.log(`error : ${error}`);
    }
} */

// Add||Use redis cache before fetch to API
const cacheMiddleware = async (req, res) => {
    try {
        await redisClient.connect();
    } catch (error) {
        res.status(500).send('Erreur de connexion à Redis');
    }
    const cacheKey = `search_name_${req.params.name}`;
    console.log(`test avec cashKey=${cacheKey}` );

    const redisResult = await redisClient.get(cacheKey);
    console.log("resulat redis.get : ",redisResult);
    try {
        if (redisResult){
            const parsedData = JSON.parse(redisResult);
            await res.json(parsedData);
            console.log("c'était dans le cache");
            return;
        }
        else{
            try {
                const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.name}`);
                // add new key/value to redis-cache
                await redisClient.set(cacheKey, JSON.stringify(response.data));
                await res.json(response.data);
                console.log("Pas dans le cache mais c'es enregistre");
                return;
            } catch (error) {
                res.status(500).send(error.message);
                return;
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }

    // Vérifier si la clé est dans le cache Redis
    /* await redisClient.get(cacheKey, async (err, cachedData) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err.message);
        }

        if (cachedData) {
            console.log("Déjà dans le cache")
            // Si les données sont dans le cache, les renvoyer directement
            const parsedData = JSON.parse(cachedData);
            res.json(parsedData);
        } else {
            // Si les données ne sont pas dans le cache, effectuer la requête
            try {
                console.log("Pas dans le cache"); 
                const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.name}`);
                
                // add new key/value to redis-cache
                await redisClient.set(cacheKey, JSON.stringify(response.data));

                res.json(response.data);
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
    }); */
};








// Seach by name
router.get('/search/name/:name', cacheMiddleware);
/* router.get('/search/name/:name', async (req, res) => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}); */

// List all cocktails by first letter
router.get('/search/first-letter/:letter', async (req, res) => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${req.params.letter}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to fetch a random cocktail
router.get('/random', async (req, res) => {
    try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to fetch a cocktail by id
router.get('/search/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;