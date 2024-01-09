import express from 'express';

const cocktailRouter = require('./cocktailsRoutes.ts');
const usersRouter = require('./usersRoutes.ts');

const router = express.Router();

router.use('/api/cocktails', cocktailRouter);

router.use('/api/users', usersRouter);

export default router;

