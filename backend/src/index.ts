import express from 'express';
const app = express();

// Import routers
const cocktailRoutes = require('./routes/cocktailsRoutes.js');

const PORT = 80;

app.use('/api/cocktails', cocktailRoutes);

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})