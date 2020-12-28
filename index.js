import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

const PORT = 80;

function handleListening() {
    console.log(`Server Running On http://localhost:${PORT}`);
}

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send(`Hello from home`);
})

app.get('/profile', (req, res) => {
    res.send(`Hello from profile`)
})

app.listen(80,handleListening);