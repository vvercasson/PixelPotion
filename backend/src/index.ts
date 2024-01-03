import express from 'express';
const app = express();
import cors from 'cors';

// Import routers
const cocktailRoutes = require('./routes/cocktailsRoutes.js');

const PORT = 80;

app.use(cors());

app.use('/api/cocktails', cocktailRoutes);

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})