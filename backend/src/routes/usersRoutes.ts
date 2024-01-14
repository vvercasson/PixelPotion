import { UsersController } from "~/controller/users.controller";

const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Create a user account.
 *     responses:
 *       '201':
 *         description: The user account is created.
 *       '409':
 *         description: User already exist.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/', UsersController.postUser);


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate a user.
 *     responses:
 *       '201':
 *         description: The user is authenticated.
 *       '401':
 *         description: User not found. Authentication failed.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/login', UsersController.getUser)

/**
 * @swagger
 * /api/users/favorites:
 *   get:
 *     summary: Retrieve the favorite cocktails of the connected user.
 *     responses:
 *       '200':
 *         description: The favorite cocktails of the connected user have been returned.
 *       '404':
 *         description: No favorites found.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/favorites', UsersController.getUserFavorites);

/**
 * @swagger
 * /api/users/favorites/add:
 *   post:
 *     summary: Add a new cocktail to the list of favorites for the connected user.
 *     responses:
 *       '201':
 *         description: The cocktail has been added to the list of favorites.
 */
router.post('/favorites/add', UsersController.postUserFavorites);

/**
 * @swagger
 * /api/users/favorites/remove:
 *   delete:
 *     summary: Remove a cocktail from the list of favorites for the connected user.
 *     responses:
 *       '201':
 *         description: The cocktail has been removed from the list of favorites.
 */
router.delete('/favorites/remove', UsersController.deleteUserFavorites);

module.exports = router;