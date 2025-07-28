import express from  'express'
import morgan from 'morgan';
import cors from  'cors';

const app = express();

app.use(cors({
    origin: 'https://localhost:5173',
    credentials: true
}))

//  passing for json bodies.

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

// logger config
app.use(morgan('combined'));
import userRouter from './routes/user.route.js'

app.use('/api/v1/users', userRouter)

export{ app };