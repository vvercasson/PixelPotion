
const redis = require('redis');
const axios = require('axios');



const redisClient = redis.createClient({
    url:'redis://redis:6379'
});

redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server',err);
});


(async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Failed to connect to Redis', error);
    }
})();


// Check the type of request before handle respond
const cacheMiddleware = async (req, res) => {
    let cacheKey;
    let getUrl;
    
    //Check the type of request then adapt for res and redis
    if (req.params.id){
        cacheKey = `search_id_${req.params.id}`;
        getUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${req.params.id}`;
    }
    else if (req.params.name){
        cacheKey = `search_name_${req.params.name}`;
        getUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.name}`;
    }
    else{
        res.status(400).send('Invalid request');
        return;
    }
    try {
        await handleRes(res,cacheKey,getUrl);
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};


// Add to redis cache before fetch API or Use redis cache without fetch API 
const handleRes = async (res, cacheKey, getUrl ) => {
    //console.log(`test avec cacheKey=${cacheKey}` );
    const redisResult = await redisClient.get(cacheKey);
    if (redisResult){
        const parsedData = JSON.parse(redisResult);
        await res.json(parsedData);
        //console.log("c'était dans le cache");
        return;
    }
    else{
        try {
            const response = await axios.get(getUrl);
            // add new key/value to redis-cache
            await redisClient.set(cacheKey, JSON.stringify(response.data));
            await res.json(response.data);
            //console.log("Pas dans le cache mais c'est enregistre");
            return;
        } catch (error) {
            res.status(500).send(error.message);
            return;
        }
    }
}




module.exports= {cacheMiddleware};




