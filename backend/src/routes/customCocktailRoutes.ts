import { CustomCocktailController } from "~/controller/custom.cocktail.controller";

const express = require('express');
const router = express.Router();

// Seach by name
router.get('/search/name/:name', CustomCocktailController.getCustomCocktailsByName);

// Search by user id
router.get('/user/:userId', CustomCocktailController.getCustomCocktailsByUserId);

// Search by id
router.get('/:id', CustomCocktailController.getCustomCocktailById);

// Post custom cocktail
router.post('/', CustomCocktailController.postCustomCocktail);

module.exports = router;