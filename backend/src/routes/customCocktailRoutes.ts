import { CustomCocktailController } from "~/controller/custom.cocktail.controller";

const express = require('express');
const router = express.Router();

// Seach by name
router.get('/search/name/:name', CustomCocktailController.getCustomCocktailsByName);

// Post custom cocktail
router.post('/', CustomCocktailController.postCustomCocktail);

module.exports = router;