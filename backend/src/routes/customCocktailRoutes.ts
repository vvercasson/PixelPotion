import { CustomCocktailController } from "~/controller/custom.cocktail.controller";

const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /api/custom-cocktails/search/name/{name}:
 *   get:
 *     summary: Search custom cocktails by name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the custom cocktail to search.
 *     responses:
 *       '200':
 *         description: Custom cocktails found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomCocktail'
 *       '404':
 *         description: Custom cocktails not found.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/search/name/:name', CustomCocktailController.getCustomCocktailsByName);

/**
 * @swagger
 * /api/custom-cocktails/:
 *   post:
 *     summary: Post a custom cocktail.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: Unique identifier of the user creating the cocktail.
 *               name:
 *                 type: string
 *                 description: Name of the custom cocktail.
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     measure:
 *                       type: string
 *                 description: List of ingredients for the cocktail.
 *               instructions:
 *                 type: string
 *                 description: Instructions for preparing the cocktail.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image of the cocktail (in binary format).
 *     responses:
 *       '201':
 *         description: Custom cocktail created successfully.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/', CustomCocktailController.postCustomCocktail);



/**
 * @swagger
 * /api/custom-cocktails/user/{userId}:
 *   get:
 *     summary: Get custom cocktails by user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the user.
 *     responses:
 *       '200':
 *         description: Custom cocktails found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomCocktail'
 *       '404':
 *         description: Custom cocktails not found.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/user/:userId', CustomCocktailController.getCustomCocktailsByUserId);


/**
 * @swagger
 * /api/custom-cocktails/{id}:
 *   get:
 *     summary: Get a custom cocktail by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the custom cocktail.
 *     responses:
 *       '200':
 *         description: Custom cocktail found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomCocktail'
 *       '404':
 *         description: Custom cocktail not found.
 *       '500':
 *         description: Internal Server Error.
 */

router.get('/:id', CustomCocktailController.getCustomCocktailById);

module.exports = router;