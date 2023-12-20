import express, { response } from 'express';
import { port, mongoURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome")
});

// Middleware for handling CORS Policy
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )

// Middleware for parsing req body
app.use('/books', booksRoute)
// if connected to db then only start server
mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("connceted to db");
        app.listen(port, () => {
            console.log('listening on port ' + port);
        })
    }).catch((err) => {
        console.log(err);
    });

export default app;
