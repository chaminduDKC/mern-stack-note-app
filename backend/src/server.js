import express from 'express';
import notesRoute from './routes/NoteRoute.js'
import {connectDb} from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const app = express();


const port = process.env.SERVER_PORT;

// middleware to access req body

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(rateLimiter)
app.use('/api/notes', notesRoute);


// once the db connected, then server should startt
connectDb().then(()=>{
    app.listen(port, ()=>{
        console.log(`server started on PORT ${port}`);
    })
});


