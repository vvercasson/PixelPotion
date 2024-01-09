import { UsersController } from "~/controller/users.controller";

const express = require('express');
const {
    User
} = require('../models/User');


const router = express.Router();

router.post('/users', UsersController.postUser);

module.exports = router;