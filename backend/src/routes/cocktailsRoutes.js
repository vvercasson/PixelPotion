const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search/name/:name', async (req, res) => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// List all cocktails by first letter
router.get('/search/first-letter/:letter', async (req, res) => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${req.params.letter}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;