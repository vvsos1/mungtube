import express from 'express';

const userRouter = express.Router();

userRouter.get('/',(req,res) => res.send('user home'));
userRouter.get('/edit',(req,res) => res.send('user edit'));
userRouter.get('/changePassword',(req,res) => res.send('user changePassword'));

export default userRouter;