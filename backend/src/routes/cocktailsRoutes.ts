import { CocktailApiController } from "~/controller/cocktail.api.controller";
const express = require('express');
const router = express.Router();

// Seach by name
router.get('/search/name/:name', CocktailApiController.getCocktailsByName);

// Route to fetch a cocktail by id
router.get('/search/:id', CocktailApiController.getCocktailById);

// List all cocktails by first letter
router.get('/search/first-letter/:letter', CocktailApiController.getCocktailsByFirstLetter);

// Route to fetch by ingredient name
router.get('/search/ingredient/:name', CocktailApiController.getCocktailsByIngredient);

// Route to fetch a random cocktail
router.get('/random', CocktailApiController.getRandomCocktail);


module.exports = router;