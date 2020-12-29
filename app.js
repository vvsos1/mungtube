import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRouter from './routers/userRouter';
import globalRouter from './routers/globalRouter';
import videoRouter from './routers/videoRouter';

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/',globalRouter);
app.use('/video',videoRouter);
app.use('/user',userRouter);

export default app;