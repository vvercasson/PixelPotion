import { CustomCocktailController } from "~/controller/custom.cocktail.controller";

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /search/name/{name}:
 *   get:
 *     summary: Search cocktails by name.
 *     parameters:
 *       - in: path
 *         name: name
 *         description: Name of the custom cocktail, can be a part of it.
 *     responses:
 *       '200':
 *         description: Return a list of cocktails that matchs the name passed in parameter.
 *       '404':
 *         description: Cocktail not found.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/search/name/:name', CustomCocktailController.getCustomCocktailsByName);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Post a custom cocktail.
 *     responses:
 *       '201':
 *         description: The custom cocktail is created.
 */
router.post('/', CustomCocktailController.postCustomCocktail);

module.exports = router;