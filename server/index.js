import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5050;

const corsOptions = {
    origin: process.env.CROSS_ORIGIN_URL, 
    credentials: true 
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    res.send('<h1>AstroNautica Backend - Developed By HackGeniuses<h1>')
})


app.listen(PORT, ()=>{
    console.log(`Server Started at Port ${PORT}`)
})