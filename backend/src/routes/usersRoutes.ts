import { UsersController } from "~/controller/users.controller";

const express = require('express');

const router = express.Router();

router.post('/', UsersController.postUser);

router.post('/login', UsersController.getUser)

module.exports = router;