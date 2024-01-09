import express from 'express';
const app = express();
import cors from 'cors';

// Import routers
const cocktailRouter = require('./routes/cocktailsRoutes.ts');

const usersRouter = require('./routes/usersRoutes.ts');

const PORT = 80;

app.use(cors());

app.use('/api/cocktails', cocktailRouter);

app.use('/api/users', usersRouter);

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})