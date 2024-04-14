import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pictureRoute from './routes/pictureRoute.js';
import authRoute from './routes/authRoute.js';
import { connectDb } from './db/db.js';
import cookieParser from 'cookie-parser';
import blogRoute from './routes/blogRoute.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { runChat } from './controllers/chatBot.js';

dotenv.config();

const PORT = process.env.PORT || 5050;

const corsOptions = {
    origin: process.env.CROSS_ORIGIN_URL, 
    credentials: true 
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use('/v1/auth',authRoute);
app.use('/v1/data/img',pictureRoute);
app.use('/v1/blog',blogRoute);
app.use('/uploads/blogs', express.static(path.join(__dirname, 'uploads/blogs')))


app.get('/',(req,res)=>{
    res.send('<h1>AstroNautica Backend - Developed By HackGeniuses<h1>')
});

connectDb();


app.post('/chat', async (req, res) => {
    try {
      const userInput = req.body?.userInput;
      console.log('incoming /chat req', userInput)
      if (!userInput) {
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
      const response = await runChat(userInput);
      res.json({ text: response });
    } catch (error) {
      console.error('Error in chat endpoint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, ()=>{
    console.log(`Server Started at Port ${PORT}`)
})