import { UsersController } from "~/controller/users.controller";

const express = require('express');

const router = express.Router();

router.post('/', UsersController.postUser);

router.post('/login', UsersController.getUser)

router.get('/favorites', UsersController.getUserFavorites);

router.post('/favorites/add', UsersController.postUserFavorites);

router.delete('/favorites/remove', UsersController.deleteUserFavorites);

module.exports = router;