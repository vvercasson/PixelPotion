import { UsersController } from "~/controller/users.controller";

const express = require('express');

const router = express.Router();

router.post('/users', UsersController.postUser);

module.exports = router;