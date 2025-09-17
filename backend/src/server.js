import express from 'express';
import notesRoute from './routes/NoteRoute.js'
import {connectDb} from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const app = express();


const port = process.env.SERVER_PORT;
const __dirname = path.resolve();

// middleware to access req body

app.use(express.json());

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173",
    }))
}
app.use(rateLimiter)
app.use('/api/notes', notesRoute);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

// once the db connected, then server should startt
connectDb().then(()=>{
    app.listen(port, ()=>{
        console.log(`server started on PORT ${port}`);
    })
});


