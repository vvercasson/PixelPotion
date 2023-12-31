const express = require('express');
const axios = require('axios');
const router = express.Router();

const {
    cacheMiddleware
} = require('./cache');



// Seach by name
router.get('/search/name/:name', cacheMiddleware);


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

// Route to fetch by ingredient name
router.get('/search/ingredient/:name', async (req, res) => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${req.params.name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to fetch a cocktail by id
router.get('/search/:id', cacheMiddleware);

module.exports = router;