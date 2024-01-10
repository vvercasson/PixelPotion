import express from 'express';

const cocktailRouter = require('./cocktailsRoutes.ts');
const usersRouter = require('./usersRoutes.ts');
const customCocktailRouter = require('./customCocktailRoutes.ts');

const router = express.Router();

router.use('/api/cocktails', cocktailRouter);

router.use('/api/users', usersRouter);

router.use('/api/custom-cocktails', customCocktailRouter);

export default router;

