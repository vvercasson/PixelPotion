import express from 'express';

const app = express();
const PORT = 80;

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})

// Routes
app.get('/', (req: express.Request,res: express.Response) => {
    console.log("Someone accessing root now !")
    res.status(200).send({
        msg:'martin la moula!'
    })
})