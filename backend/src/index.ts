import express from 'express';
const app = express();
import cors from 'cors';

// Import routers
const cocktailRoutes = require('./routes/cocktailsRoutes.ts');

const usersRoutes = require('./routes/usersRoutes.ts');

const PORT = 80;

app.use(cors());

app.use('/api/cocktails', cocktailRoutes);

app.use('/api/users', usersRoutes);

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})