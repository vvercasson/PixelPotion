import { CocktailApiController } from "~/controller/cocktail.api.controller";
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
 *         description: Name of the cocktail, can be a part of it.
 *     responses:
 *       '200':
 *         description: Return a list of cocktails that matchs the name passed in parameter.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/search/name/:name', CocktailApiController.getCocktailsByName);

/** 
 * @swagger
 * /search/{id}:
 *   get:
 *     summary: Search cocktail by id.
 *     parameters:
 *       - in: path
 *         id: id
 *         description: The exact id of the cocktail.
 *     responses:
 *       '200':
 *         description: Return a cocktail that matchs the id passed in parameter.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/search/:id', CocktailApiController.getCocktailById);

/** 
 * @swagger
 * /search/first-letter/{letter}:
 *   get:
 *     summary: Search cocktails by first letter.
 *     parameters:
 *       - in: path
 *         letter: letter
 *         description: A letter.
 *     responses:
 *       '200':
 *         description: Return a list of cocktails that matchs the first letter passed in parameter.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/search/first-letter/:letter', CocktailApiController.getCocktailsByFirstLetter);

/** 
 * @swagger
 * /search/ingredient/{name}:
 *   get:
 *     summary: Search cocktails by ingredient name.
 *     parameters:
 *       - in: path
 *         name: name
 *         description: A name of ingredient in a cocktail.
 *     responses:
 *       '200':
 *         description: Return a list of cocktails which are based on the ingredient passed in parameter.
 *       '500':
 *         description: Internal Server Error
 */
router.get('/search/ingredient/:name', CocktailApiController.getCocktailsByIngredient);

/** 
 * @swagger
 * /search/random:
 *   get:
 *     summary: Get a random cocktail.
 *     responses:
 *       '200':
 *         description: Return a random cocktail.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/random', CocktailApiController.getRandomCocktail);


module.exports = router;