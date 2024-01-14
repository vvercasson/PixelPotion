import { CustomCocktailController } from "~/controller/custom.cocktail.controller";

const express = require('express');
const router = express.Router();


router.get('/search/name/:name', CustomCocktailController.getCustomCocktailsByName);

/**
 * @swagger
 * /api/custom-cocktails/:
 *   post:
 *     summary: Post a custom cocktail.
 *     responses:
 *       '201':
 *         description: The custom cocktail is created.
 *       '500':
 *          description: Internal Server Error.
 */
router.post('/', CustomCocktailController.postCustomCocktail);


/**
 * @swagger
 * /api/custom-cocktails/user/{userId}:
 *   get:
 *     summary: Get all custom cocktails from a user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Id of the user.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Return a list of all custom cocktails created by the user specified.
 *       '404':
 *         description: Either no custom cocktails were found or the user does not exist.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/user/:userId', CustomCocktailController.getCustomCocktailsByUserId);


/**
 * @swagger
 * /api/custom-cocktails/{id}:
 *   get:
 *     summary: Get the custom cocktail with the corresponding id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the custom cocktail.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Return the corresponding cocktail details.
 *       '404':
 *         description: Cocktail not found.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/:id', CustomCocktailController.getCustomCocktailById);

module.exports = router;