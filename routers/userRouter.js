import express from 'express';
import routes from '../routes';

const userRouter = express.Router();

userRouter.get(routes.userDetail,(req,res) => res.send('userDetail'));
userRouter.get(routes.editProfile,(req,res) => res.send('editProfile'));
userRouter.get(routes.editPassword,(req,res) => res.send('editPassword'));
export default userRouter;