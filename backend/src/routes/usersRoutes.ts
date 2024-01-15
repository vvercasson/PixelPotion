import { UsersController } from "~/controller/users.controller";

const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Create a user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Desired username for the new account.
 *               password:
 *                 type: string
 *                 description: Password for the new account.
 *     responses:
 *       '201':
 *         description: The user account is created.
 *       '409':
 *         description: Username already exists.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/', UsersController.postUser);



/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       '200':
 *         description: The user is authenticated. Returns user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *       '401':
 *         description: Authentication failed. User not found or password incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/login', UsersController.getUser);



/**
 * @swagger
 * /api/users/favorites:
 *   get:
 *     summary: Retrieve the favorite cocktails of the connected user.
 *     responses:
 *       '200':
 *         description: The favorite cocktails of the connected user have been returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: The ID of a favorite cocktail.
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